export default Ember.Component.extend({
  init() {
    this._super(...arguments);

    const settings = Discourse.SiteSettings;

    this.setProperties({
      confirmation: false,
      currency: settings.discourse_donations_currency,
    });
  },

  actions: {
    handleConfirmStripeCard(paymentMethod) {
      this.set('confirmation', paymentMethod);
    },

    confirmStripeCard() {
      const paymentMethodId = paymentMethod.paymentMethod.id;
      this.stripePaymentHandler(paymentMethodId, this.amount).then((paymentIntent) => {
        if (paymentIntent.error) {
          this.set('cardError', paymentIntent.error);
        }
      });
    },
  },
});
