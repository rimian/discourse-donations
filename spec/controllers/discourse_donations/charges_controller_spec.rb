# frozen_string_literal: true

require 'rails_helper'

module DiscourseDonations
  RSpec.describe ChargesController, type: :controller do
    routes { DiscourseDonations::Engine.routes }
    let!(:current_user) { Fabricate(:user) }
    let(:src_id) { 'src_1FCnNEEfVxQsvRbHRgDs7tm1' }

    before do
      SiteSetting.stubs(:discourse_donations_currency).returns('AUD')

      controller
        .expects(:current_user)
        .at_least_once
        .returns(current_user)

      ::Stripe::Source
        .expects(:create)
        .with(
          type: 'ach_credit_transfer',
          currency: 'AUD',
          owner: { email: current_user.email },
        )
        .once
        .returns(id: src_id)
    end

    describe 'creating an account' do
      it 'creates a new account'
    end

    describe 'Source' do
      it 'has a source' do
        ::Stripe::Charge.expects(:create).once.with(has_entry(:source, src_id))
        post :create, params: { type: 'once' }, format: :json
        expect(response).to have_http_status 200
      end
    end

    describe 'money' do
      it 'has the amount' do
        ::Stripe::Charge.expects(:create).once.with(has_entry(:amount, '102'))
        post :create, params: { type: 'once', amount: 102 }, format: :json
        expect(response).to have_http_status 200
      end
    end

    describe 'cause' do
      it 'has a cause' do
        ::Stripe::Charge.expects(:create).once.with(has_entry(:metadata, discourse_cause: 'A mission from God'))
        post :create, params: { type: 'once', cause: 'A mission from God' }, format: :json
        expect(response).to have_http_status 200
      end

      it 'is without a cause'
    end

    describe 'settings' do
      it 'has the currency' do
        ::Stripe::Charge.expects(:create).once.with(has_entry(:currency, 'AUD'))
        post :create, params: { type: 'once' }, format: :json
        expect(response).to have_http_status 200
      end

      it 'has a description' do
        SiteSetting.stubs(:discourse_donations_description).returns('Bring me four fried chickens and a Coke.')
        ::Stripe::Charge.expects(:create).once.with(has_entry(:description, 'Bring me four fried chickens and a Coke.'))
        post :create, params: { type: 'once' }, format: :json
        expect(response).to have_http_status 200
      end
    end

    describe 'subscribe' do
      it 'has one off payments' do
        ::Stripe::Charge.expects(:create).once
        post :create, params: { type: 'once' }, format: :json
        expect(response).to have_http_status 200
      end

      it 'has subscriptions' do
        ::Stripe::Subscription.expects(:create).once
        post :create, params: { type: 'monthly' }, format: :json
        expect(response).to have_http_status 200
      end
    end

    describe 'card errors' do
      let(:declined) { ::Stripe::CardError.new('declined', {}) }

      it 'declines a card' do
        ::Stripe::Charge.expects(:create).raises(declined)

        post :create, params: { type: 'once' }, format: :json
        body = JSON.parse(response.body)

        aggregate_failures do
          expect(response).to have_http_status 200
          expect(body['error']).to eq "Card Declined"
        end
      end
    end
  end
end
