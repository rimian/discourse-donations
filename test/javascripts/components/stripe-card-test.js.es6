import componentTest from "helpers/component-test";

moduleForComponent("stripe-card", { integration: true });

componentTest("stripe card success", {
  template: `{{stripe-card stripeTokenHandler=onSubmit}}`,

  beforeEach() {
    window.Stripe = () => {
      return {
        createToken() {
          return new Ember.RSVP.Promise((resolve) => {
            resolve({ token: 'stripe-token' });
          });
        },
        elements() {
          return {
            create() {
              return { mount() {}, card() {} };
            },
          };
        },
      };
    };
  },

  async test(assert) {
    assert.expect(1);

    this.set("onSubmit", (arg) => {
      assert.equal(arg, "stripe-token", "card is submitted");
    });

    await click(".btn-payment");
  },
});
