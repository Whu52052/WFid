import { Scene } from '../store/gameStore'

export const scenes: Scene[] = [
  // 序章：踏入古宅
  {
    id: 'entrance',
    name: '古宅大门',
    description: `民国十二年，深秋。

你站在一座古老的宅院前。斑驳的木门上缠绕着枯萎的藤蔓，门楣上的字迹早已模糊不清。手中的邀请函已经被汗水浸湿——那是一封没有署名的信，只写着"速来，有危险"。

一阵阴风吹过，门上的铜环轻轻晃动，发出沉闷的响声。

你需要输入大门的密码锁才能进入...`,
    connections: ['hall'],
    items: ['old-key', 'invitation'],
    puzzles: ['gate-lock'],
    explored: false,
  },
  {
    id: 'hall',
    name: '前厅',
    description: `你推开沉重的木门，踏入前厅。

空气中弥漫着一股陈腐的气息，混合着某种说不清的香味。四周的墙壁上挂满了老照片，照片中的人物面部都被刻意刮花了，只剩下空洞的眼眶盯着你。

一张八仙桌摆在正中央，桌上放着一盏油灯，火光摇曳。

地上有一条细细的绳子，似乎连接着某个机关...`,
    connections: ['living-room', 'dining-room', 'study'],
    items: ['rope'],
    puzzles: [],
    explored: false,
  },
  {
    id: 'living-room',
    name: '客厅',
    description: `客厅里摆放着红木家具，虽然蒙尘却依然显得豪华。

壁炉上方挂着一幅巨大的油画，画中是一位身着旗袍的女子，但她的脸被黑色的颜料涂掉了。

沙发上有几本旧书和一张报纸。报纸的日期是民国十一年九月十三日——正是这座宅院发生灭门惨案的日子。

壁炉里的灰烬似乎还有余温...`,
    connections: ['hall'],
    items: ['old-newspaper', 'book'],
    puzzles: [],
    explored: false,
  },
  {
    id: 'dining-room',
    name: '餐厅',
    description: `餐厅的长桌上摆满了餐具，仿佛正在等待一场永远不会开始的宴会。

餐具上都刻着"林"字——这是这座宅院的主人姓氏。一把椅子被推倒了，地上散落着瓷器的碎片。

墙边的酒柜里还剩几瓶落满灰尘的酒。其中一个酒瓶的位置明显不对，像是被人移动过...

餐桌中央的花瓶里，插着一束早已枯萎的白花。`,
    connections: ['hall', 'kitchen'],
    items: ['wine-bottle'],
    puzzles: [],
    explored: false,
  },
  {
    id: 'study',
    name: '书房',
    description: `书房里堆满了书籍和卷轴，空气中有一股檀香的味道。

书桌上放着一盏煤油灯和一本翻开的日记。日记的最后一页被撕掉了一角，只能看到几个字："...真相是..."

书架上有一个上锁的抽屉，似乎需要特定的钥匙才能打开。

窗户被木板封死了，外面似乎有什么东西在抓挠...`,
    connections: ['hall'],
    items: ['diary-fragment', 'brass-key'],
    puzzles: ['desk-drawer'],
    explored: false,
  },
  {
    id: 'kitchen',
    name: '厨房',
    description: `厨房的灶台上有一口大锅，里面煮着什么黑色的东西，散发出恶臭。

墙上挂着一排刀具，每一把都生锈了。水龙头在滴水，但流出的水是暗红色的...

案板上刻着一些奇怪的符号，像是某种仪式的痕迹。

角落里有一个地窖入口，但被一把沉重的锁链锁住了。`,
    connections: ['dining-room'],
    items: ['kitchen-knife'],
    puzzles: [],
    explored: false,
  },
  // 第一章：过去的回响
  {
    id: 'bedroom',
    name: '主卧室',
    description: `主卧室的床上躺着一具早已风干的尸体，穿着民国时期的寿衣。

床头的柜子上放着一张全家福，但除了女主人外，其他人的脸都被涂花了。

衣柜的门半开着，里面挂满了旗袍和长衫。地上有一条项链，在月光下闪闪发亮...

窗外传来一阵婴儿的哭声，但这里是二楼...`,
    connections: ['upstairs-hallway'],
    items: ['necklace', 'photo'],
    puzzles: [],
    explored: false,
  },
  {
    id: 'attic',
    name: '阁楼',
    description: `你爬上狭窄的楼梯，来到阁楼。

这里堆满了杂物——旧家具、儿童玩具、箱笼。一面落地镜靠在墙边，但镜子里映出的不是你，而是一个模糊的人影。

一个纸箱里装满了信件，是一对恋人的通信。从信的内容来看，他们的爱情是不被祝福的...

角落里有一个上锁的八音盒。`,
    connections: ['upstairs-hallway'],
    items: ['love-letters', 'music-box'],
    puzzles: ['music-box-puzzle'],
    explored: false,
  },
  {
    id: 'upstairs-hallway',
    name: '二楼走廊',
    description: `走廊的墙壁上挂着一排相框，但所有的照片都是同一个场景——这座宅院的正门，在不同的季节、不同的天气里。

其中一张照片让你愣住了：照片里的宅院门口，站着几个人，其中一个——长得和你一模一样。

走廊尽头的窗户被打破了，风从那里灌进来，吹得窗帘疯狂飘动。`,
    connections: ['bedroom', 'attic', 'master-bedroom'],
    items: [],
    puzzles: [],
    explored: false,
  },
  {
    id: 'master-bedroom',
    name: '主人卧室',
    description: `这是宅院主人的卧室，比其他房间都要宽敞。

床帏是深红色的，已经褪色了。床头挂着一把剑，剑身上刻着"林"字。

梳妆台的镜子上用口红写着几个字："他们都该死"。

床头柜的抽屉里有一把手枪和几发子弹，以及一封遗书。

遗书上写着："当我完成仪式后，一切都会结束..."`,
    connections: ['upstairs-hallway'],
    items: ['suicide-note', 'revolver'],
    puzzles: [],
    explored: false,
  },
  // 第二章：隐藏的真相
  {
    id: 'basement',
    name: '地下室',
    description: `你找到了一把钥匙，打开了通往地下室的门。

潮湿的空气扑面而来，夹杂着霉味和某种化学药剂的味道。

地下室的墙壁上画满了壁画，描绘的是某种宗教仪式的场景。壁画中央有一个祭坛，上面摆着几个密封的罐子。

地上有一个圆圈，里面画着复杂的符文。圆圈中央有一个凹槽，似乎需要放入什么东西...

角落里有一扇铁门，上面刻着"禁地"两个字。`,
    connections: ['corridor'],
    items: ['ritual-knife'],
    puzzles: ['basin-puzzle'],
    explored: false,
  },
  {
    id: 'secret-room',
    name: '密室',
    description: `你触发了某个机关，墙壁裂开了一条缝，露出了一间密室。

密室很小，四面墙壁都是镜子。镜子里映出无数个你的身影，但每一个都在做着不同的动作——有的在逃跑，有的在尖叫，有的...已经倒下了。

中央有一个石台，台上放着一本古旧的书籍和一张符咒。

当你拿起书籍时，四周的镜子开始发出刺耳的声响...`,
    connections: ['corridor'],
    items: ['cursed-book', 'talisman'],
    puzzles: [],
    explored: false,
  },
  {
    id: 'corridor',
    name: '神秘走廊',
    description: `一条长长的走廊，两侧挂满了白色的帷幔。

走廊尽头有一扇门，门上贴着一张符咒。符咒上的字迹在黑暗中发出微弱的光。

你需要解开符咒上的谜题才能继续前进...

走廊两侧的帷幔后面，似乎藏着什么东西，在你经过时会发出沙沙的声响。`,
    connections: ['basement', 'secret-room', 'temple'],
    items: [],
    puzzles: ['talisman-puzzle'],
    explored: false,
  },
  {
    id: 'temple',
    name: '祠堂',
    description: `你来到了一间祠堂，供奉着林家的祖先牌位。

牌位前的香炉里插着三炷香，但香灰的形状很奇怪，像是三根手指指向天空...

供桌上放着一个木盒和一张泛黄的纸。纸上画着一个家族的谱系，但其中一个分支被红色的墨水划掉了，旁边写着"叛徒"。

祠堂的后面有一扇暗门，通往后院。`,
    connections: ['corridor', 'backyard'],
    items: ['family-tree', 'wooden-box'],
    puzzles: [],
    explored: false,
  },
  {
    id: 'backyard',
    name: '后院',
    description: `后院长满了荒草，中央有一口古井。

井口的石栏上刻着"镇魂井"三个字。井里黑漆漆的，什么也看不见，但你能听到水波晃动的声音。

井边有一棵枯树，树下埋着什么东西——泥土是新翻过的。

院子里还有一间小小的石屋，门上挂着"祭司居"三个字。`,
    connections: ['temple', 'shrine'],
    items: ['shovel'],
    puzzles: ['well-puzzle'],
    explored: false,
  },
  {
    id: 'shrine',
    name: '祭司居',
    description: `石屋里供奉着一尊不知名的神像，神像的面目模糊不清。

墙上挂满了符咒和面具。面具的表情各异——有的在笑，有的在哭，有的面目狰狞...

地上有一个祭坛，摆满了供品。其中有一个银色的十字架，和周围的道教符咒格格不入。

祭坛下面有一行小字："救赎之道，在于牺牲..."`,
    connections: ['backyard'],
    items: ['silver-cross', 'mask'],
    puzzles: [],
    explored: false,
  },
  // 第三章：轮回
  {
    id: 'deep-shrine',
    name: '古宅深处',
    description: `你沿着地下通道来到了古宅最深处。

这里是一个巨大的地下洞穴，洞穴中央矗立着一座祭坛。祭坛上有七根蜡烛，围成一个圆圈。

四周的墙壁上刻满了文字，记录着这座宅院的历史——原来，林家世代都是祭司，用活人献祭来换取家族的昌盛。

而你...似乎就是第七个祭品。

洞穴的另一端有一扇门，门上写着"出口"两个字。但要打开那扇门，你需要做出选择...`,
    connections: ['choice-room'],
    items: [],
    puzzles: ['final-puzzle'],
    explored: false,
  },
  {
    id: 'choice-room',
    name: '抉择之间',
    description: `这是最后的选择。

祭坛上放着两样东西：一把钥匙和一张符咒。

钥匙可以打开出口的门，让你逃出生天。

符咒可以终结这场仪式，释放所有被困的灵魂——但代价是，你将永远留在这里，成为新的守护者。

在你做出选择之前，那个和你长得一模一样的人影再次出现...

"终于等到你了，"他说，"来继承我的位置吧。"`,
    connections: [],
    items: [],
    puzzles: [],
    explored: false,
  },
]

export const getSceneById = (id: string): Scene | undefined => {
  return scenes.find(s => s.id === id)
}

export const getScenesByChapter = (chapter: number): Scene[] => {
  // Chapter 0: Prologue scenes (entrance, hall, living-room, dining-room, study, kitchen)
  // Chapter 1: Past scenes (bedroom, attic, upstairs-hallway, master-bedroom)
  // Chapter 2: Truth scenes (basement, secret-room, corridor, temple, backyard, shrine)
  // Chapter 3: Cycle scenes (deep-shrine, choice-room)
  const chapterRanges: { [key: number]: string[] } = {
    0: ['entrance', 'hall', 'living-room', 'dining-room', 'study', 'kitchen'],
    1: ['bedroom', 'attic', 'upstairs-hallway', 'master-bedroom'],
    2: ['basement', 'secret-room', 'corridor', 'temple', 'backyard', 'shrine'],
    3: ['deep-shrine', 'choice-room'],
  }
  const sceneIds = chapterRanges[chapter] || []
  return scenes.filter(s => sceneIds.includes(s.id))
}
