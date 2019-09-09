export default Ember.Component.extend({
  init() {
    this._super(...arguments);

    const settings = Discourse.SiteSettings;

    this.setProperties({
      currency: settings.discourse_donations_currency,
    });
  },
});
