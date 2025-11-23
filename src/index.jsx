import React from 'react';
import { createRoot } from 'react-dom/client';
import WeChatMiniProgramPrototype from '../main.js';
import './index.css'; // 可选：如果不需要立即使用样式，可删除该行

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<WeChatMiniProgramPrototype />);
