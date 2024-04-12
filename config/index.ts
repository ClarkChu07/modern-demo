export default {
  /* 属性为具体的 method 和 请求 url，值为 object 或 array 作为请求的结果 */
  'GET /api/getInfo': { data: [1, 2, 3, 4] },

  /* method 默认为 GET */
  '/api/getExample': { id: 1 },

  /* 可以使用自定义函数根据请求动态返回数据, req & res 都是 Node.js HTTP 原生对象 */
  'POST /api/addInfo': (req: any, res : any) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end('200');
  },
};
