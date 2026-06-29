import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function SettingsPage() {
  const navigate = useNavigate()
  const [musicVolume, setMusicVolume] = useState(70)
  const [sfxVolume, setSfxVolume] = useState(80)
  const [textSpeed, setTextSpeed] = useState('normal')
  const [hintsEnabled, setHintsEnabled] = useState(true)

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 text-horror-text-secondary hover:text-horror-text-primary"
        >
          ← 返回
        </button>
        <h1 className="text-xl font-bold text-horror-text-primary">设置</h1>
        <div className="w-12" />
      </header>

      <div className="space-y-6 max-w-md mx-auto">
        {/* Audio settings */}
        <section>
          <h2 className="text-horror-text-secondary text-sm mb-4 uppercase tracking-wider">
            音效设置
          </h2>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-horror-text-primary">背景音乐</label>
                <span className="text-horror-text-secondary">{musicVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={musicVolume}
                onChange={(e) => setMusicVolume(Number(e.target.value))}
                className="w-full accent-horror-accent"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-horror-text-primary">音效</label>
                <span className="text-horror-text-secondary">{sfxVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sfxVolume}
                onChange={(e) => setSfxVolume(Number(e.target.value))}
                className="w-full accent-horror-accent"
              />
            </div>
          </div>
        </section>

        {/* Game settings */}
        <section>
          <h2 className="text-horror-text-secondary text-sm mb-4 uppercase tracking-wider">
            游戏设置
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-horror-text-primary mb-2 block">文字显示速度</label>
              <div className="grid grid-cols-3 gap-2">
                {['slow', 'normal', 'fast'].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setTextSpeed(speed)}
                    className={`p-3 rounded border transition-all ${
                      textSpeed === speed
                        ? 'border-horror-accent bg-horror-accent/20 text-horror-text-primary'
                        : 'border-horror-border bg-horror-bg-secondary text-horror-text-secondary'
                    }`}
                  >
                    {speed === 'slow' ? '慢' : speed === 'normal' ? '中' : '快'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-horror-bg-secondary rounded border border-horror-border">
              <div>
                <div className="text-horror-text-primary">启用提示</div>
                <div className="text-horror-text-secondary text-sm">卡关时显示提示按钮</div>
              </div>
              <button
                onClick={() => setHintsEnabled(!hintsEnabled)}
                className={`w-14 h-8 rounded-full transition-all relative ${
                  hintsEnabled ? 'bg-horror-accent' : 'bg-horror-border'
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 rounded-full bg-horror-text-primary transition-all ${
                    hintsEnabled ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* About */}
        <section>
          <h2 className="text-horror-text-secondary text-sm mb-4 uppercase tracking-wider">
            关于
          </h2>
          <div className="p-4 bg-horror-bg-secondary rounded border border-horror-border">
            <div className="text-horror-text-primary font-bold mb-2">旧宅诡事</div>
            <div className="text-horror-text-secondary text-sm space-y-1">
              <p>版本：v0.1.0 Alpha</p>
              <p>类型：心理恐怖解谜游戏</p>
              <p>背景：1920年代民国时期</p>
            </div>
          </div>
        </section>

        {/* Reset progress */}
        <section>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (confirm('确定要重置所有进度吗？此操作不可撤销。')) {
                localStorage.clear()
                navigate('/')
              }
            }}
            className="w-full p-4 bg-horror-danger/20 border border-horror-danger text-horror-danger rounded"
          >
            重置游戏进度
          </motion.button>
        </section>
      </div>
    </div>
  )
}
