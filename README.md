# Discourse Donations

[![Build Status](https://travis-ci.org/rimian/discourse-donations.svg?branch=master)](https://travis-ci.org/rimian/discourse-donations)

Accept donations from visitors to your [Discourse](https://www.discourse.org/) application. Integrates with [Stripe](https://stripe.com).

## Installation

* Be sure your site is enforcing https.
* Follow the install instructions here: https://meta.discourse.org/t/install-a-plugin/19157
* Add your Stripe public and private keys in settings and set the currency to your local value.
* Enable the plugin and wait for people to donate money.

## Usage

1. Click **Donate**:
![Menu Link](doc/menulink.png)

1. Enter card details:
![Enter card details](doc/pre-payment.png)

1. Click **Make Payment**:
![Enter card details](doc/post-payment.png)

## Development

You may wish to use [stripe mock](https://github.com/stripe/stripe-mock) to test your api requests locally.

## Testing

Running specs:

`LOAD_PLUGINS=1 bundle exec rspec plugins/discourse-donations/spec`

These commands should run:

* ```yarn prettier --list-different 'assets/**/*.scss' '**/*.es6'```

## Warranty

This software comes with no warranty of any kind.
