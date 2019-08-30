# frozen_string_literal: true

module DiscourseDonations
  class ChargesController < ::ApplicationController
    skip_before_action :verify_authenticity_token, only: [:create]
    before_action :create_source, only: [:create]

    def create
      begin
        metadata = cause

        charge = {
          amount: params[:amount],
          currency: SiteSetting.discourse_donations_currency,
          description: SiteSetting.discourse_donations_description,
          source: @source[:id],
          metadata: metadata,
        }

        if params['type'] == 'once'
          response = ::Stripe::Charge.create(charge)
        else
          response = ::Stripe::Subscription.create(charge)
        end

      rescue ::Stripe::CardError => e
        response = { error: 'Card Declined' }
      end

      render json: response
    end

    def index
      render json: {}
    end

    private

    def cause
      { discourse_cause: params[:cause] }
    end

    def create_source
      ::Stripe.api_key = SiteSetting.discourse_donations_secret_key

      @source = ::Stripe::Source.create(
        type: "ach_credit_transfer",
        currency: SiteSetting.discourse_donations_currency,
        owner: { email: current_user.email },
      )
    end
  end
end
