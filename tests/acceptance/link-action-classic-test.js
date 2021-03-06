import Controller from '@ember/controller';
import { action } from '@ember/object';
import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { cleanRegister } from './helpers';

module('Acceptance | Link-action Classic', function(hooks) {
  setupApplicationTest(hooks);

  test('clicking {{link-to}} with closure action specified correctly transition to other route and triggers an action', async function(assert) {
    assert.expect(3);

    cleanRegister(this, 'controller:products', class ProductController extends Controller {
      @action
      testAction() {
        assert.ok('Test action fired.');
      }
    });

    cleanRegister(this, 'template:products', hbs`
      {{#link-to 'cart' invokeAction=(action 'testAction')}}
        Cart
      {{/link-to}}
    `);

    await visit('/products');

    assert.equal(currentURL(), '/products');

    await click('a');

    assert.equal(currentURL(), '/cart');
  });

  test('action parameters can be passed to invoked action', async function(assert) {
    assert.expect(3);

    cleanRegister(this, 'controller:products', class ProductsController extends Controller {
      @action
      testAction(param1, param2) {
          assert.equal(param1, 'value1', 'param1 has value of value1');
          assert.equal(param2, 'value2', 'param2 has value of value2');
      }
    });

    cleanRegister(this, 'template:products', hbs`
      {{#link-to 'cart' invokeAction=(action 'testAction' 'value1' 'value2')}}
        Cart
      {{/link-to}}
    `);

    await visit('/products');

    await click('a');

    assert.equal(currentURL(), '/cart');
  });
});
