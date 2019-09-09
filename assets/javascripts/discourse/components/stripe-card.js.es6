
export default Ember.Component.extend({
  cardError: false,

  init() {
    this._super(...arguments);

    const settings = Discourse.SiteSettings;

    this.setProperties({
      stripe: Stripe(settings.discourse_donations_public_key),
      color: jQuery("body").css("color")
    });
  },

  didInsertElement() {
    this._super(...arguments);

    const color = this.get('color');

    const style = {
      base: {
        color,
        iconColor: color,
        "::placeholder": { color }
      }
    };

    const elements = this.stripe.elements();
    const card = elements.create("card", { style, hidePostalCode: true });

    card.mount('#card-element');

    this.set("card", card);

    card.on("change", (result) => {
      this.set('cardError', false);

      if(result.error) {
        this.set('cardError', result.error.message);
      }
    });
  },

  actions: {
    submitStripeCard() {
      this.stripe.createPaymentMethod('card', this.card).then((paymentMethod) => {
        if (paymentMethod.error) {
          this.set('cardError', paymentMethod.error);
        }
        else {
          this.stripePaymentHandler(paymentMethod.paymentMethod.id, this.amount).then((paymentIntent) => {
            if (paymentIntent.error) {
              this.set('cardError', paymentIntent.error);
            }
          });
        }
      }, () => {
        this.set('cardError', 'Unknown error.');
      });
    },
  },
});
