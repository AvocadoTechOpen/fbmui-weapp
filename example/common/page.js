export default function (options = {}) {
  return Page({
    onShareAppMessage() {
      return {
        title: 'Fbmui Weapp 组件库演示',
      };
    },
    ...options,
  });
}
