import React, { useState, useRef, useEffect } from 'react';
import { 
  Home, 
  MessageSquare, 
  Users, 
  User, 
  Camera, 
  Mic, 
  Edit3, 
  ChevronRight, 
  Smile, 
  Frown, 
  Meh, 
  CheckCircle2, 
  Circle,
  Bell,
  BookOpen,
  Activity,
  Send,
  Sparkles,
  FileText,
  Calendar
} from 'lucide-react';

// --- 类型定义 ---
type Tab = 'home' | 'ai' | 'school' | 'profile';

const WeChatMiniProgramPrototype = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  // --- 模拟数据 ---
  const [tasks, setTasks] = useState([
    { id: 1, title: '目光对视训练', duration: '10分钟', completed: false, type: 'video' },
    { id: 2, title: '大动作：拍球', duration: '15分钟', completed: true, type: 'video' },
    { id: 3, title: '绘本阅读：情绪认知', duration: '20分钟', completed: false, type: 'audio' },
  ]);

  const [mood, setMood] = useState<string | null>(null);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  // --- 渲染组件 ---

  // 1. 首页组件
  const HomeView = () => (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto pb-20">
      {/* 顶部卡片 */}
      <div className="bg-emerald-600 p-6 rounded-b-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex justify-between items-start text-white">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              下午好，乐乐妈妈 <Sparkles className="w-4 h-4 text-yellow-300" />
            </h2>
            <p className="text-emerald-100 text-sm mt-1">乐乐已坚持干预 128 天</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Child" className="w-10 h-10 rounded-full" />
          </div>
        </div>
        
        {/* 情绪记录 */}
        <div className="mt-6 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
          <p className="text-white text-xs mb-3 opacity-90">乐乐今天的心情如何？</p>
          <div className="flex justify-around">
            <button 
              onClick={() => setMood('happy')} 
              className={`flex flex-col items-center gap-1 transition-all ${mood === 'happy' ? 'scale-110' : 'opacity-70'}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${mood === 'happy' ? 'bg-yellow-400' : 'bg-white/20'}`}>
                <Smile className={`w-6 h-6 ${mood === 'happy' ? 'text-white' : 'text-white'}`} />
              </div>
              <span className="text-[10px] text-white">开心</span>
            </button>
            <button 
              onClick={() => setMood('normal')}
              className={`flex flex-col items-center gap-1 transition-all ${mood === 'normal' ? 'scale-110' : 'opacity-70'}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${mood === 'normal' ? 'bg-blue-400' : 'bg-white/20'}`}>
                <Meh className={`w-6 h-6 ${mood === 'normal' ? 'text-white' : 'text-white'}`} />
              </div>
              <span className="text-[10px] text-white">平静</span>
            </button>
            <button 
              onClick={() => setMood('bad')}
              className={`flex flex-col items-center gap-1 transition-all ${mood === 'bad' ? 'scale-110' : 'opacity-70'}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${mood === 'bad' ? 'bg-rose-400' : 'bg-white/20'}`}>
                <Frown className={`w-6 h-6 ${mood === 'bad' ? 'text-white' : 'text-white'}`} />
              </div>
              <span className="text-[10px] text-white">哭闹</span>
            </button>
          </div>
        </div>
      </div>

      {/* 今日任务 */}
      <div className="px-4 -mt-4 relative z-20">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500" />
              今日干预任务 (IEP)
            </h3>
            <span className="text-xs text-slate-400">完成度 1/3</span>
          </div>
          
          <div className="space-y-3">
            {tasks.map(task => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex items-center gap-3">
                  <button onClick={() => toggleTask(task.id)}>
                    {task.completed ? 
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : 
                      <Circle className="w-5 h-5 text-slate-300" />
                    }
                  </button>
                  <div>
                    <p className={`text-sm font-medium ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                      {task.title}
                    </p>
                    <p className="text-xs text-slate-400">{task.duration} • {task.type === 'video' ? '需上传视频' : '需录音'}</p>
                  </div>
                </div>
                {!task.completed && (
                  <button className="text-xs bg-emerald-100 text-emerald-600 px-3 py-1.5 rounded-full font-medium">
                    去完成
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 快捷打卡 */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-20">
          <h3 className="font-bold text-slate-800 mb-4 text-sm">随手记录</h3>
          <div className="grid grid-cols-3 gap-4">
            <button className="flex flex-col items-center gap-2 p-3 bg-orange-50 rounded-xl">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
                <Camera className="w-5 h-5" />
              </div>
              <span className="text-xs text-slate-600">视频分析</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-3 bg-blue-50 rounded-xl">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
                <Mic className="w-5 h-5" />
              </div>
              <span className="text-xs text-slate-600">语音记录</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-3 bg-purple-50 rounded-xl">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-500">
                <Edit3 className="w-5 h-5" />
              </div>
              <span className="text-xs text-slate-600">文字日记</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // 2. AI 助手组件
  const AIView = () => {
    const [messages, setMessages] = useState([
      { id: 1, role: 'ai', text: '您好，我是您的AI育儿顾问。您可以问我关于家庭干预技巧、情绪处理或IEP解读的问题。' },
    ]);
    const [input, setInput] = useState('');
    const endRef = useRef<HTMLDivElement>(null);

    const handleSend = () => {
      if(!input.trim()) return;
      const userMsg = { id: Date.now(), role: 'user', text: input };
      setMessages([...messages, userMsg]);
      setInput('');
      
      // 模拟AI回复
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          id: Date.now() + 1, 
          role: 'ai', 
          text: '根据RAG知识库检索：对于孩子在公共场合的尖叫行为，建议采用“区别强化”策略。首先保持冷静，不要给予过多关注（避免负强化），待孩子安静间隙立即给予表扬或强化物。是否需要为您生成具体的情景脚本？' 
        }]);
      }, 1000);
    };

    useEffect(() => {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
      <div className="flex flex-col h-full bg-slate-50">
        <div className="bg-white p-4 border-b flex items-center justify-center shadow-sm relative z-10">
          <h2 className="font-bold text-slate-800">AI 育儿顾问</h2>
          <div className="absolute right-4 top-4 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">在线</div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-emerald-500 text-white rounded-br-none' 
                  : 'bg-white text-slate-700 shadow-sm rounded-bl-none border border-slate-100'
              }`}>
                {msg.role === 'ai' && <div className="text-xs text-emerald-600 font-bold mb-1 flex items-center gap-1"><Sparkles className="w-3 h-3"/> AI Assistant</div>}
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* 快捷问题 */}
        <div className="px-4 pb-2">
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
             <button onClick={() => setInput("孩子不看人怎么办？")} className="whitespace-nowrap px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs text-slate-600 shadow-sm">
               孩子不看人怎么办？
             </button>
             <button onClick={() => setInput("如何做回合式教学(DTT)？")} className="whitespace-nowrap px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs text-slate-600 shadow-sm">
               如何做回合式教学(DTT)？
             </button>
          </div>
        </div>

        <div className="bg-white p-3 border-t flex items-center gap-2 mb-14">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入您的问题..."
            className="flex-1 bg-slate-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white active:scale-95 transition-transform"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

  // 3. 家校组件
  const SchoolView = () => (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto pb-20">
      <div className="bg-white p-4 border-b sticky top-0 z-10">
        <h2 className="font-bold text-center text-slate-800">家校互通</h2>
      </div>
      
      <div className="p-4 space-y-4">
        {/* 老师留言 */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-3 border-b border-slate-50 pb-3">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Teacher" alt="Teacher" className="w-10 h-10 rounded-full bg-indigo-50" />
             <div className="flex-1">
               <h3 className="font-bold text-slate-800 text-sm">王老师 (特教)</h3>
               <p className="text-xs text-slate-400">今天 14:30</p>
             </div>
             <div className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded">在校反馈</div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">
            乐乐今天在感统课上表现很棒，能够独立完成独木桥行走，没有出现畏难情绪。但是在午休时稍微有点情绪波动，建议晚上在家多安抚。
          </p>
          <div className="bg-slate-50 p-2 rounded flex gap-2">
             <div className="w-20 h-16 bg-slate-200 rounded flex items-center justify-center text-xs text-slate-400">课堂照片</div>
             <div className="w-20 h-16 bg-slate-200 rounded flex items-center justify-center text-xs text-slate-400">课堂照片</div>
          </div>
        </div>

        {/* IEP 进度概览 */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-500" />
              本周 IEP 目标进度
            </h3>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600">社交领域 - 共同关注</span>
                <span className="text-blue-600 font-bold">80%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600">语言领域 - 提要求</span>
                <span className="text-emerald-600 font-bold">45%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 4. 我的组件
  const ProfileView = () => (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto pb-20">
      <div className="bg-white p-8 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div>
             <h2 className="text-xl font-bold text-slate-800">乐乐</h2>
             <p className="text-sm text-slate-500">5岁 • 男 • 星星的孩子</p>
          </div>
        </div>
      </div>

      <div className="space-y-px">
        <div className="bg-white p-4 flex justify-between items-center active:bg-slate-50">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500"><FileText className="w-4 h-4" /></div>
             <span className="text-sm font-medium text-slate-700">我的 IEP 计划书</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />
        </div>
        <div className="bg-white p-4 flex justify-between items-center active:bg-slate-50">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-500"><Activity className="w-4 h-4" /></div>
             <span className="text-sm font-medium text-slate-700">历史评估报告</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />
        </div>
        <div className="bg-white p-4 flex justify-between items-center active:bg-slate-50">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500"><Users className="w-4 h-4" /></div>
             <span className="text-sm font-medium text-slate-700">家庭支持小组</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />
        </div>
        <div className="bg-white p-4 flex justify-between items-center active:bg-slate-50 mt-4">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-500"><BookOpen className="w-4 h-4" /></div>
             <span className="text-sm font-medium text-slate-700">关于我们</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-200 p-4 font-sans">
      {/* 手机外壳模拟 */}
      <div className="w-[375px] h-[760px] bg-white rounded-[40px] shadow-2xl overflow-hidden relative border-[8px] border-slate-900 flex flex-col">
        
        {/* 状态栏模拟 */}
        <div className="h-10 bg-slate-900 text-white flex justify-between items-center px-6 text-xs select-none">
          <span>9:41</span>
          <div className="flex gap-1.5">
            <div className="w-4 h-2.5 bg-white rounded-[1px]"></div>
            <div className="w-3 h-2.5 bg-white rounded-[1px]"></div>
            <div className="w-4 h-2.5 border border-white rounded-[1px] relative">
               <div className="absolute inset-0.5 bg-white"></div>
            </div>
          </div>
        </div>

        {/* 顶部小程序胶囊模拟 (仅在首页显示，为了视觉效果) */}
        <div className="absolute top-12 right-4 w-20 h-8 bg-white/60 backdrop-blur-sm rounded-full border border-slate-200 z-50 flex items-center justify-around px-2">
            <div className="w-1 h-1 rounded-full bg-slate-800"></div>
            <div className="w-1 h-1 rounded-full bg-slate-800"></div>
            <div className="w-px h-4 bg-slate-300"></div>
            <div className="w-4 h-4 rounded-full border-2 border-slate-800"></div>
        </div>

        {/* 主内容区域 */}
        <div className="flex-1 overflow-hidden relative">
          {activeTab === 'home' && <HomeView />}
          {activeTab === 'ai' && <AIView />}
          {activeTab === 'school' && <SchoolView />}
          {activeTab === 'profile' && <ProfileView />}
        </div>

        {/* 底部导航栏 */}
        <div className="h-16 bg-white border-t border-slate-100 flex justify-around items-center px-2 relative z-50">
          <button 
            onClick={() => setActiveTab('home')} 
            className={`flex flex-col items-center gap-1 w-16 ${activeTab === 'home' ? 'text-emerald-600' : 'text-slate-400'}`}
          >
            <Home className="w-6 h-6" fill={activeTab === 'home' ? 'currentColor' : 'none'} />
            <span className="text-[10px] font-medium">首页</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('school')} 
            className={`flex flex-col items-center gap-1 w-16 ${activeTab === 'school' ? 'text-emerald-600' : 'text-slate-400'}`}
          >
            <BookOpen className="w-6 h-6" fill={activeTab === 'school' ? 'currentColor' : 'none'} />
            <span className="text-[10px] font-medium">家校</span>
          </button>

          {/* AI 中心按钮 */}
          <button 
            onClick={() => setActiveTab('ai')} 
            className="flex flex-col items-center justify-center -mt-6"
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 ${activeTab === 'ai' ? 'bg-emerald-600 ring-4 ring-emerald-100' : 'bg-emerald-500'}`}>
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <span className={`text-[10px] font-medium mt-1 ${activeTab === 'ai' ? 'text-emerald-600' : 'text-slate-400'}`}>AI助手</span>
          </button>

          <button 
            onClick={() => setActiveTab('school')} // 暂时复用School Tab作为社区入口示例
            className={`flex flex-col items-center gap-1 w-16 text-slate-400`}
          >
            <Users className="w-6 h-6" />
            <span className="text-[10px] font-medium">社区</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('profile')} 
            className={`flex flex-col items-center gap-1 w-16 ${activeTab === 'profile' ? 'text-emerald-600' : 'text-slate-400'}`}
          >
            <User className="w-6 h-6" fill={activeTab === 'profile' ? 'currentColor' : 'none'} />
            <span className="text-[10px] font-medium">我的</span>
          </button>
        </div>

        {/* 底部 Home Indicator */}
        <div className="h-5 bg-white flex justify-center items-start pt-1">
          <div className="w-32 h-1 bg-slate-900 rounded-full"></div>
        </div>
      </div>
      
      {/* 提示信息 */}
      <div className="absolute bottom-4 text-slate-500 text-sm">
        * 此为原型交互演示，点击底部导航切换功能
      </div>
    </div>
  );
};

export default WeChatMiniProgramPrototype;