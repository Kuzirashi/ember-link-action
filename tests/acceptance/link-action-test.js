import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import hbs from 'htmlbars-inline-precompile';

const { Controller } = Ember;

moduleForAcceptance('Acceptance | link action');

test('clicking {{link-to}} with closure action specified correctly transition to other route and triggers an action', function(assert) {
  assert.expect(3);

  const { application } = this;

  application.register('controller:link-action', Controller.extend({
    actions: {
      testAction() {
        assert.ok('Test action fired.');
      }
    }
  }));

  application.register('template:link-action', hbs`
    {{#link-to 'other-route' invokeAction=(action 'testAction')}}
      Link to other route
    {{/link-to}}
  `);

  visit('/link-action');

  andThen(() => assert.equal(currentURL(), '/link-action'));

  click('a');

  andThen(() => assert.equal(currentURL(), '/other-route'));
});

test('clicking {{link-to}} with action name specified correctly transition to other route and triggers an action', function(assert) {
  assert.expect(3);

  const { application } = this;

  application.register('controller:link-action', Controller.extend({
    actions: {
      testAction() {
        assert.ok('Test action fired.');
      }
    }
  }));

  application.register('template:link-action', hbs`
    {{#link-to 'other-route' invokeAction='testAction'}}
      Link to other route
    {{/link-to}}
  `);

  visit('/link-action');

  andThen(() => assert.equal(currentURL(), '/link-action'));

  click('a');

  andThen(() => assert.equal(currentURL(), '/other-route'));
});

test('action parameters can be passed to invoked action', function(assert) {
  assert.expect(2);

  const { application } = this;

  application.register('controller:link-action', Controller.extend({
    actions: {
      testAction(param1, param2) {
        assert.equal(param1, 'value1', 'param1 has value of value1');
        assert.equal(param2, 'value2', 'param2 has value of value2');
      }
    }
  }));

  application.register('template:link-action', hbs`
    {{#link-to 'other-route' invokeAction=(action 'testAction' 'value1' 'value2')}}
      Link to other route
    {{/link-to}}
  `);

  visit('/link-action');

  click('a');
});
