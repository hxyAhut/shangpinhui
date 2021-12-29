import Mock from 'mockjs';
// 引入数据
// webpack默认对外暴露的:图片、json数据
import banners from '@/mock/banners.json';
import floors from '@/mock/floors.json';

// 一参：请求地址； 二参：请求数据
Mock.mock("/mock/banners", {code:200, data: banners});
Mock.mock("/mock/floors", {code:200, data: floors});