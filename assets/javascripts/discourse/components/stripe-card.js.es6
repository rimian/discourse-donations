
export default Ember.Component.extend({
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
    const card = elements.create("card", { style });

    card.mount('#card-element');

    this.set("card", card);
  },


  actions: {
    submitStripeCard() {
      this.stripe.createToken(this.card).then((result) => {
        if (result.error) {

        } else {
          this.stripeTokenHandler(result.token);
        }
      });
    },
  },
});
