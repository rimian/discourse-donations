# frozen_string_literal: true

module DiscourseDonations
  class ChargesController < ::ApplicationController
    skip_before_action :verify_authenticity_token, only: [:create]

    def create
      ::Stripe.api_key = SiteSetting.discourse_donations_secret_key

      begin

        response = ::Stripe::PaymentIntent.create(
          amount: 1099,
          currency: SiteSetting.discourse_donations_currency,
          payment_method_types: ['card'],
          payment_method: params[:paymentMethodId],
          confirm: true,
        )

      rescue ::Stripe::CardError => e
        response = { error: 'Card Declined' }
      end

      render json: response
    end

    def index

    end
  end
end
