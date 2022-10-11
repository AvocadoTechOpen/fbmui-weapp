import path from 'path';
import simulate from 'miniprogram-simulate';

describe('switch', () => {
  const VanSwitch = simulate.load(
    path.resolve(__dirname, '../../switch/index'),
    'fbm-switch',
    {
      rootPath: path.resolve(__dirname, '../../'),
    }
  );

  test('should allow to custom active-value and inactive-value', async () => {
    const comp = simulate.render(
      simulate.load({
        usingComponents: {
          'fbm-switch': VanSwitch,
        },
        template: `
          <fbm-switch
            id="wrapper"
            checked="{{ checked }}"
            active-color="#07c160"
            inactive-color="#ee0a24"
            active-value="on"
            inactive-value="off"
            bind:change="onChange"
          />
        `,
        data: {
          checked: 'on',
        },
        methods: {
          onChange({ detail }) {
            this.setData({ checked: detail });
          },
        },
      })
    );
    comp.attach(document.createElement('parent-wrapper'));

    const wrapper = comp.querySelector('#wrapper');
    const btn = wrapper?.querySelector('.fbm-switch');
    expect((btn as any).toJSON()).toMatchSnapshot();
    btn?.dispatchEvent('tap');
    await simulate.sleep(10);
    expect((btn as any).toJSON()).toMatchSnapshot();
    expect(comp.data.checked).toEqual('off');
  });
});
