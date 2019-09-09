import componentTest from "helpers/component-test";

moduleForComponent("stripe-card", { integration: true });

componentTest("stripe card success", {
  template: `{{stripe-card handleConfirmStripeCard=onSubmit}}`,

  beforeEach() {
    window.Stripe = () => {
      return {
        createPaymentMethod() {
          return new Ember.RSVP.Promise((resolve) => {
            resolve('payment-method-response');
          });
        },
        elements() {
          return {
            create() {
              return {
                on() {},
                card() {},
                mount() {},
              };
            },
          };
        },
      };
    };
  },

  async test(assert) {
    assert.expect(1);

    this.set("onSubmit", (arg) => {
      assert.equal(arg, "payment-method-response", "payment method created");
    });

    await click(".btn-payment");
  },
});
