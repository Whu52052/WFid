import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Clear existing data
  await prisma.puzzle.deleteMany()
  await prisma.scene.deleteMany()

  // Seed scenes
  const scenes = [
    // 序章
    {
      id: 'entrance',
      chapterId: 0,
      name: '古宅大门',
      description: `民国十二年，深秋。

你站在一座古老的宅院前。斑驳的木门上缠绕着枯萎的藤蔓，门楣上的字迹早已模糊不清。手中的邀请函已经被汗水浸湿——那是一封没有署名的信，只写着"速来，有危险"。

一阵阴风吹过，门上的铜环轻轻晃动，发出沉闷的响声。`,
      connections: JSON.stringify(['hall']),
      items: JSON.stringify(['old-key', 'invitation']),
      puzzles: JSON.stringify(['gate-lock']),
    },
    {
      id: 'hall',
      chapterId: 0,
      name: '前厅',
      description: `你推开沉重的木门，踏入前厅。

空气中弥漫着一股陈腐的气息，混合着某种说不清的香味。四周的墙壁上挂满了老照片，照片中的人物面部都被刻意刮花了，只剩下空洞的眼眶盯着你。

一张八仙桌摆在正中央，桌上放着一盏油灯，火光摇曳。`,
      connections: JSON.stringify(['living-room', 'dining-room', 'study']),
      items: JSON.stringify(['rope']),
      puzzles: JSON.stringify([]),
    },
    {
      id: 'living-room',
      chapterId: 0,
      name: '客厅',
      description: `客厅里摆放着红木家具，虽然蒙尘却依然显得豪华。

壁炉上方挂着一幅巨大的油画，画中是一位身着旗袍的女子，但她的脸被黑色的颜料涂掉了。

沙发上有几本旧书和一张报纸。报纸的日期是民国十一年九月十三日——正是这座宅院发生灭门惨案的日子。`,
      connections: JSON.stringify(['hall']),
      items: JSON.stringify(['old-newspaper', 'book']),
      puzzles: JSON.stringify([]),
    },
    {
      id: 'dining-room',
      chapterId: 0,
      name: '餐厅',
      description: `餐厅的长桌上摆满了餐具，仿佛正在等待一场永远不会开始的宴会。

餐具上都刻着"林"字——这是这座宅院的主人姓氏。一把椅子被推倒了，地上散落着瓷器的碎片。

墙边的酒柜里还剩几瓶落满灰尘的酒。`,
      connections: JSON.stringify(['hall', 'kitchen']),
      items: JSON.stringify(['wine-bottle']),
      puzzles: JSON.stringify([]),
    },
    {
      id: 'study',
      chapterId: 0,
      name: '书房',
      description: `书房里堆满了书籍和卷轴，空气中有一股檀香的味道。

书桌上放着一盏煤油灯和一本翻开的日记。日记的最后一页被撕掉了一角，只能看到几个字："...真相是..."

书架上有一个上锁的抽屉，似乎需要特定的钥匙才能打开。`,
      connections: JSON.stringify(['hall']),
      items: JSON.stringify(['diary-fragment', 'brass-key']),
      puzzles: JSON.stringify(['desk-drawer']),
    },
    {
      id: 'kitchen',
      chapterId: 0,
      name: '厨房',
      description: `厨房的灶台上有一口大锅，里面煮着什么黑色的东西，散发出恶臭。

墙上挂着一排刀具，每一把都生锈了。水龙头在滴水，但流出的水是暗红色的...

角落里有一个地窖入口，但被一把沉重的锁链锁住了。`,
      connections: JSON.stringify(['dining-room']),
      items: JSON.stringify(['kitchen-knife']),
      puzzles: JSON.stringify([]),
    },
    // 第一章
    {
      id: 'bedroom',
      chapterId: 1,
      name: '主卧室',
      description: `主卧室的床上躺着一具早已风干的尸体，穿着民国时期的寿衣。

床头的柜子上放着一张全家福，但除了女主人外，其他人的脸都被涂花了。

衣柜的门半开着，里面挂满了旗袍和长衫。地上有一条项链，在月光下闪闪发亮...`,
      connections: JSON.stringify(['upstairs-hallway']),
      items: JSON.stringify(['necklace', 'photo']),
      puzzles: JSON.stringify([]),
    },
    {
      id: 'attic',
      chapterId: 1,
      name: '阁楼',
      description: `你爬上狭窄的楼梯，来到阁楼。

这里堆满了杂物——旧家具、儿童玩具、箱笼。一面落地镜靠在墙边，但镜子里映出的不是你，而是一个模糊的人影。

一个纸箱里装满了信件，是一对恋人的通信。`,
      connections: JSON.stringify(['upstairs-hallway']),
      items: JSON.stringify(['love-letters', 'music-box']),
      puzzles: JSON.stringify(['music-box-puzzle']),
    },
    {
      id: 'upstairs-hallway',
      chapterId: 1,
      name: '二楼走廊',
      description: `走廊的墙壁上挂着一排相框，但所有的照片都是同一个场景——这座宅院的正门，在不同的季节、不同的天气里。

其中一张照片让你愣住了：照片里的宅院门口，站着几个人，其中一个——长得和你一模一样。`,
      connections: JSON.stringify(['bedroom', 'attic', 'master-bedroom']),
      items: JSON.stringify([]),
      puzzles: JSON.stringify([]),
    },
    {
      id: 'master-bedroom',
      chapterId: 1,
      name: '主人卧室',
      description: `这是宅院主人的卧室，比其他房间都要宽敞。

床帏是深红色的，已经褪色了。床头挂着一把剑，剑身上刻着"林"字。

梳妆台的镜子上用口红写着几个字："他们都该死"。

床头柜的抽屉里有一把手枪和几发子弹，以及一封遗书。`,
      connections: JSON.stringify(['upstairs-hallway']),
      items: JSON.stringify(['suicide-note', 'revolver']),
      puzzles: JSON.stringify([]),
    },
    // 第二章
    {
      id: 'basement',
      chapterId: 2,
      name: '地下室',
      description: `你找到了一把钥匙，打开了通往地下室的门。

潮湿的空气扑面而来，夹杂着霉味和某种化学药剂的味道。

地下室的墙壁上画满了壁画，描绘的是某种宗教仪式的场景。壁画中央有一个祭坛，上面摆着几个密封的罐子。`,
      connections: JSON.stringify(['corridor']),
      items: JSON.stringify(['ritual-knife']),
      puzzles: JSON.stringify(['basin-puzzle']),
    },
    {
      id: 'secret-room',
      chapterId: 2,
      name: '密室',
      description: `你触发了某个机关，墙壁裂开了一条缝，露出了一间密室。

密室很小，四面墙壁都是镜子。镜子里映出无数个你的身影，但每一个都在做着不同的动作——有的在逃跑，有的在尖叫，有的...已经倒下了。

中央有一个石台，台上放着一本古旧的书籍和一张符咒。`,
      connections: JSON.stringify(['corridor']),
      items: JSON.stringify(['cursed-book', 'talisman']),
      puzzles: JSON.stringify([]),
    },
    {
      id: 'corridor',
      chapterId: 2,
      name: '神秘走廊',
      description: `一条长长的走廊，两侧挂满了白色的帷幔。

走廊尽头有一扇门，门上贴着一张符咒。符咒上的字迹在黑暗中发出微弱的光。

你需要解开符咒上的谜题才能继续前进...`,
      connections: JSON.stringify(['basement', 'secret-room', 'temple']),
      items: JSON.stringify([]),
      puzzles: JSON.stringify(['talisman-puzzle']),
    },
    {
      id: 'temple',
      chapterId: 2,
      name: '祠堂',
      description: `你来到了一间祠堂，供奉着林家的祖先牌位。

牌位前的香炉里插着三炷香，但香灰的形状很奇怪，像是三根手指指向天空...

供桌上放着一个木盒和一张泛黄的纸。纸上画着一个家族的谱系，但其中一个分支被红色的墨水划掉了，旁边写着"叛徒"。`,
      connections: JSON.stringify(['corridor', 'backyard']),
      items: JSON.stringify(['family-tree', 'wooden-box']),
      puzzles: JSON.stringify([]),
    },
    {
      id: 'backyard',
      chapterId: 2,
      name: '后院',
      description: `后院长满了荒草，中央有一口古井。

井口的石栏上刻着"镇魂井"三个字。井里黑漆漆的，什么也看不见，但你能听到水波晃动的声音。

井边有一棵枯树，树下埋着什么东西——泥土是新翻过的。`,
      connections: JSON.stringify(['temple', 'shrine']),
      items: JSON.stringify(['shovel']),
      puzzles: JSON.stringify(['well-puzzle']),
    },
    {
      id: 'shrine',
      chapterId: 2,
      name: '祭司居',
      description: `石屋里供奉着一尊不知名的神像，神像的面目模糊不清。

墙上挂满了符咒和面具。面具的表情各异——有的在笑，有的在哭，有的面目狰狞...

祭坛下面有一行小字："救赎之道，在于牺牲..."`,
      connections: JSON.stringify(['backyard']),
      items: JSON.stringify(['silver-cross', 'mask']),
      puzzles: JSON.stringify([]),
    },
    // 第三章
    {
      id: 'deep-shrine',
      chapterId: 3,
      name: '古宅深处',
      description: `你沿着地下通道来到了古宅最深处。

这里是一个巨大的地下洞穴，洞穴中央矗立着一座祭坛。祭坛上有七根蜡烛，围成一个圆圈。

四周的墙壁上刻满了文字，记录着这座宅院的历史——原来，林家世代都是祭司，用活人献祭来换取家族的昌盛。`,
      connections: JSON.stringify(['choice-room']),
      items: JSON.stringify([]),
      puzzles: JSON.stringify(['final-puzzle']),
    },
    {
      id: 'choice-room',
      chapterId: 3,
      name: '抉择之间',
      description: `这是最后的选择。

祭坛上放着两样东西：一把钥匙和一张符咒。

钥匙可以打开出口的门，让你逃出生天。

符咒可以终结这场仪式，释放所有被困的灵魂——但代价是，你将永远留在这里，成为新的守护者。

在你做出选择之前，那个和你长得一模一样的人影再次出现...`,
      connections: JSON.stringify([]),
      items: JSON.stringify([]),
      puzzles: JSON.stringify([]),
    },
  ]

  for (const scene of scenes) {
    await prisma.scene.create({ data: scene })
  }
  console.log(`Seeded ${scenes.length} scenes`)

  // Seed puzzles
  const puzzles = [
    {
      id: 'gate-lock',
      sceneId: 'entrance',
      type: 'password',
      name: '大门密码锁',
      hint: '邀请函上的日期可能隐藏着线索...',
      solution: '0918',
      reward: JSON.stringify({ scenes: ['hall'] }),
    },
    {
      id: 'desk-drawer',
      sceneId: 'study',
      type: 'combination',
      name: '书桌抽屉',
      hint: '书房里有很多书籍，也许有关于林家的记载...',
      solution: '1880',
      reward: JSON.stringify({ items: ['diary'], notes: ['diary-secret'] }),
    },
    {
      id: 'music-box-puzzle',
      sceneId: 'attic',
      type: 'combination',
      name: '八音盒',
      hint: '阁楼里的信件中提到过一首诗..."月落乌啼，霜满天..."',
      solution: '月亮-乌鸦-星星',
      reward: JSON.stringify({ items: ['silver-key'], notes: ['love-secret'] }),
    },
    {
      id: 'basin-puzzle',
      sceneId: 'basement',
      type: 'logic',
      name: '祭坛凹槽',
      hint: '祭坛上的罐子里似乎装着什么东西...',
      solution: '祭祀之眼',
      reward: JSON.stringify({ scenes: ['secret-room'], notes: ['ritual-truth'] }),
    },
    {
      id: 'talisman-puzzle',
      sceneId: 'corridor',
      type: 'password',
      name: '符咒之谜',
      hint: '祠堂里的家谱也许有线索...',
      solution: '天地人',
      reward: JSON.stringify({ scenes: ['temple'] }),
    },
    {
      id: 'well-puzzle',
      sceneId: 'backyard',
      type: 'combination',
      name: '古井之秘',
      hint: '祭司居里的面具也许暗示着什么...',
      solution: '乾坤震巽',
      reward: JSON.stringify({ scenes: ['deep-shrine'], notes: ['well-secret'] }),
    },
    {
      id: 'final-puzzle',
      sceneId: 'deep-shrine',
      type: 'logic',
      name: '轮回之匙',
      hint: '记住你所发现的真相，选择最关键的那个...',
      solution: '轮回',
      reward: JSON.stringify({ scenes: ['choice-room'] }),
    },
  ]

  for (const puzzle of puzzles) {
    await prisma.puzzle.create({ data: puzzle })
  }
  console.log(`Seeded ${puzzles.length} puzzles`)

  console.log('Database seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
