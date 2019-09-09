export default Ember.Component.extend({
  init() {
    this._super(...arguments);

    console.log('wat');

    const settings = Discourse.SiteSettings;

    console.log(3, settings.discourse_donations_currency);

    this.setProperties({
      currency: settings.discourse_donations_currency,
    });
  },
});
