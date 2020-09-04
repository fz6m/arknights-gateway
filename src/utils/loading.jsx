/**
 * @description: 测试 loading 工具
 * @param {Promise} 需要延迟的动态导入 import()
 * @param {int} 延迟时间
 */
export const loadingTest = (value, ms = 3000) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
};


