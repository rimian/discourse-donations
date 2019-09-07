import { default as computed } from "ember-addons/ember-computed-decorators";
import { ajax } from "discourse/lib/ajax";

export default Ember.Controller.extend({
  actions: {
    stripePaymentHandler(paymentMethodId) {
      ajax("/donate/charges", {
        data: { paymentMethodId },
        method: "post"
      }).then((result) => {

      });
    },
  },
});
