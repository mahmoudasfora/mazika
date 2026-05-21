import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 بدء زرع قاعدة البيانات...')

  // ===== تنظيف البيانات الحالية =====
  console.log('🧹 تنظيف البيانات الحالية...')
  await prisma.articleTag.deleteMany()
  await prisma.articleTeam.deleteMany()
  await prisma.comment.deleteMany()
  await prisma.prediction.deleteMany()
  await prisma.matchEvent.deleteMany()
  await prisma.matchLineup.deleteMany()
  await prisma.match.deleteMany()
  await prisma.topScorer.deleteMany()
  await prisma.standing.deleteMany()
  await prisma.leagueTeam.deleteMany()
  await prisma.player.deleteMany()
  await prisma.team.deleteMany()
  await prisma.league.deleteMany()
  await prisma.userFavorite.deleteMany()
  await prisma.user.deleteMany()
  await prisma.adSlot.deleteMany()
  await prisma.siteSetting.deleteMany()
  await prisma.sitePage.deleteMany()
  console.log('✅ تم تنظيف البيانات')

  // ===== المستخدمين =====
  console.log('👥 إنشاء المستخدمين...')
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@sportpulse.com',
      password: 'admin123',
      name: 'مدير النظام',
      role: 'admin',
      bio: 'مدير النظام الرئيسي لمنصة سبورت بلس الإخبارية',
      avatar: '/avatars/admin.png',
    },
  })

  const editorUser = await prisma.user.create({
    data: {
      email: 'editor@sportpulse.com',
      password: 'editor123',
      name: 'أحمد المحرر',
      role: 'editor',
      bio: 'محرر رياضي متخصص في كرة القدم العربية والأفريقية',
      avatar: '/avatars/editor.png',
    },
  })

  console.log(`✅ تم إنشاء ${2} مستخدم`)

  // ===== الدوريات =====
  console.log('🏆 إنشاء الدوريات...')
  const leagues = await Promise.all([
    prisma.league.create({
      data: {
        name: 'الدوري المصري الممتاز',
        nameEn: 'Egyptian Premier League',
        country: 'مصر',
        type: 'league',
        season: '2025-2026',
        isActive: true,
        order: 1,
      },
    }),
    prisma.league.create({
      data: {
        name: 'دوري روشن السعودي',
        nameEn: 'Saudi Pro League',
        country: 'السعودية',
        type: 'league',
        season: '2025-2026',
        isActive: true,
        order: 2,
      },
    }),
    prisma.league.create({
      data: {
        name: 'دوري أبطال أفريقيا',
        nameEn: 'CAF Champions League',
        country: 'أفريقيا',
        type: 'cup',
        season: '2025-2026',
        isActive: true,
        order: 3,
      },
    }),
    prisma.league.create({
      data: {
        name: 'الدوري الإنجليزي الممتاز',
        nameEn: 'English Premier League',
        country: 'إنجلترا',
        type: 'league',
        season: '2025-2026',
        isActive: true,
        order: 4,
      },
    }),
    prisma.league.create({
      data: {
        name: 'دوري أبطال أوروبا',
        nameEn: 'UEFA Champions League',
        country: 'أوروبا',
        type: 'cup',
        season: '2025-2026',
        isActive: true,
        order: 5,
      },
    }),
    prisma.league.create({
      data: {
        name: 'الدوري الإسباني',
        nameEn: 'La Liga',
        country: 'إسبانيا',
        type: 'league',
        season: '2025-2026',
        isActive: true,
        order: 6,
      },
    }),
  ])

  const [egyptianLeague, saudiLeague, cafChampions, epl, ucl, laliga] = leagues
  console.log(`✅ تم إنشاء ${leagues.length} دوري`)

  // ===== الفرق =====
  console.log('⚽ إنشاء الفرق...')

  // Egyptian teams
  const egyptianTeams = await Promise.all([
    prisma.team.create({
      data: { name: 'الأهلي', nameEn: 'Al Ahly', shortName: 'AHL', country: 'مصر', city: 'القاهرة', stadium: 'ستاد السلام الدولي', founded: 1907, color: '#C8102E' },
    }),
    prisma.team.create({
      data: { name: 'الزمالك', nameEn: 'Zamalek', shortName: 'ZAM', country: 'مصر', city: 'القاهرة', stadium: 'ستاد القاهرة الدولي', founded: 1911, color: '#FFFFFF' },
    }),
    prisma.team.create({
      data: { name: 'الإسماعيلي', nameEn: 'Ismaily', shortName: 'ISM', country: 'مصر', city: 'الإسماعيلية', stadium: 'ستاد الإسماعيلية', founded: 1921, color: '#FFD700' },
    }),
    prisma.team.create({
      data: { name: 'المصري', nameEn: 'Masry', shortName: 'MAS', country: 'مصر', city: 'بورسعيد', stadium: 'ستاد بورسعيد', founded: 1920, color: '#006633' },
    }),
    prisma.team.create({
      data: { name: 'بيراميدز', nameEn: 'Pyramids', shortName: 'PYR', country: 'مصر', city: 'القاهرة', stadium: 'ستاد الدفاع الجوي', founded: 2008, color: '#8B008B' },
    }),
  ])

  const [ahly, zamalek, ismaily, masry, pyramids] = egyptianTeams

  // Saudi teams
  const saudiTeams = await Promise.all([
    prisma.team.create({
      data: { name: 'الهلال', nameEn: 'Al Hilal', shortName: 'HIL', country: 'السعودية', city: 'الرياض', stadium: 'ستاد الملك فهد الدولي', founded: 1957, color: '#003DA5' },
    }),
    prisma.team.create({
      data: { name: 'النصر', nameEn: 'Al Nassr', shortName: 'NAS', country: 'السعودية', city: 'الرياض', stadium: 'استاد مرسول بارك', founded: 1955, color: '#FFD700' },
    }),
    prisma.team.create({
      data: { name: 'الأهلي السعودي', nameEn: 'Al Ahli Saudi', shortName: 'AHS', country: 'السعودية', city: 'جدة', stadium: 'ستاد مدينة الملك عبدالله الرياضية', founded: 1937, color: '#006633' },
    }),
    prisma.team.create({
      data: { name: 'الاتحاد', nameEn: 'Al Ittihad', shortName: 'ITH', country: 'السعودية', city: 'جدة', stadium: 'ستاد مدينة الملك عبدالله الرياضية', founded: 1927, color: '#FFC72C' },
    }),
    prisma.team.create({
      data: { name: 'الاتفاق', nameEn: 'Al Ettifaq', shortName: 'ETQ', country: 'السعودية', city: 'الدمام', stadium: 'ستاد محمد بن فهد', founded: 1944, color: '#006400' },
    }),
  ])

  const [hilal, nassr, ahliSaudi, ittihad, ettefaq] = saudiTeams

  // English teams
  const englishTeams = await Promise.all([
    prisma.team.create({
      data: { name: 'ليفربول', nameEn: 'Liverpool', shortName: 'LIV', country: 'إنجلترا', city: 'ليفربول', stadium: 'أنفيلد', founded: 1892, color: '#C8102E' },
    }),
    prisma.team.create({
      data: { name: 'مانشستر سيتي', nameEn: 'Manchester City', shortName: 'MCI', country: 'إنجلترا', city: 'مانشستر', stadium: 'الاتحاد', founded: 1880, color: '#6CABDD' },
    }),
    prisma.team.create({
      data: { name: 'أرسنال', nameEn: 'Arsenal', shortName: 'ARS', country: 'إنجلترا', city: 'لندن', stadium: 'الإمارات', founded: 1886, color: '#EF0107' },
    }),
    prisma.team.create({
      data: { name: 'تشيلسي', nameEn: 'Chelsea', shortName: 'CHE', country: 'إنجلترا', city: 'لندن', stadium: 'ستامفورد بريدج', founded: 1905, color: '#034694' },
    }),
  ])

  const [liverpool, manCity, arsenal, chelsea] = englishTeams

  // Spanish teams
  const spanishTeams = await Promise.all([
    prisma.team.create({
      data: { name: 'ريال مدريد', nameEn: 'Real Madrid', shortName: 'RMA', country: 'إسبانيا', city: 'مدريد', stadium: 'سانتياغو برنابيو', founded: 1902, color: '#FFFFFF' },
    }),
    prisma.team.create({
      data: { name: 'برشلونة', nameEn: 'Barcelona', shortName: 'BAR', country: 'إسبانيا', city: 'برشلونة', stadium: 'كامب نو', founded: 1899, color: '#A50044' },
    }),
    prisma.team.create({
      data: { name: 'أتلتيكو مدريد', nameEn: 'Atletico Madrid', shortName: 'ATM', country: 'إسبانيا', city: 'مدريد', stadium: 'واندا ميتروبوليتانو', founded: 1903, color: '#CB3524' },
    }),
  ])

  const [realMadrid, barcelona, atleticoMadrid] = spanishTeams

  const allTeams = [...egyptianTeams, ...saudiTeams, ...englishTeams, ...spanishTeams]
  console.log(`✅ تم إنشاء ${allTeams.length} فريق`)

  // ===== ربط الفرق بالدوريات =====
  console.log('🔗 ربط الفرق بالدوريات...')
  const leagueTeamLinks = await Promise.all([
    // Egyptian Premier League
    ...egyptianTeams.map(t => prisma.leagueTeam.create({ data: { leagueId: egyptianLeague.id, teamId: t.id } })),
    // Saudi Pro League
    ...saudiTeams.map(t => prisma.leagueTeam.create({ data: { leagueId: saudiLeague.id, teamId: t.id } })),
    // EPL
    ...englishTeams.map(t => prisma.leagueTeam.create({ data: { leagueId: epl.id, teamId: t.id } })),
    // La Liga
    ...spanishTeams.map(t => prisma.leagueTeam.create({ data: { leagueId: laliga.id, teamId: t.id } })),
    // CAF Champions League - Egyptian teams
    prisma.leagueTeam.create({ data: { leagueId: cafChampions.id, teamId: ahly.id } }),
    prisma.leagueTeam.create({ data: { leagueId: cafChampions.id, teamId: zamalek.id } }),
    prisma.leagueTeam.create({ data: { leagueId: cafChampions.id, teamId: pyramids.id } }),
    // UCL - English & Spanish teams
    prisma.leagueTeam.create({ data: { leagueId: ucl.id, teamId: liverpool.id } }),
    prisma.leagueTeam.create({ data: { leagueId: ucl.id, teamId: manCity.id } }),
    prisma.leagueTeam.create({ data: { leagueId: ucl.id, teamId: arsenal.id } }),
    prisma.leagueTeam.create({ data: { leagueId: ucl.id, teamId: realMadrid.id } }),
    prisma.leagueTeam.create({ data: { leagueId: ucl.id, teamId: barcelona.id } }),
  ])
  console.log(`✅ تم إنشاء ${leagueTeamLinks.length} رابط دوري-فريق`)

  // ===== اللاعبين =====
  console.log('🏃 إنشاء اللاعبين...')

  const players = await Promise.all([
    // Liverpool players
    prisma.player.create({ data: { name: 'محمد صلاح', nameEn: 'Mohamed Salah', position: 'FWD', number: 11, age: 33, nationality: 'مصري', goals: 22, assists: 13, teamId: liverpool.id } }),
    prisma.player.create({ data: { name: 'داروين نونيز', nameEn: 'Darwin Nunez', position: 'FWD', number: 27, age: 26, nationality: 'أوروغواياني', goals: 10, assists: 5, teamId: liverpool.id } }),
    prisma.player.create({ data: { name: 'فيرجيل فان دايك', nameEn: 'Virgil van Dijk', position: 'DEF', number: 4, age: 34, nationality: 'هولندي', goals: 3, assists: 2, teamId: liverpool.id } }),

    // Man City players
    prisma.player.create({ data: { name: 'إيرلينغ هالاند', nameEn: 'Erling Haaland', position: 'FWD', number: 9, age: 25, nationality: 'نرويجي', goals: 25, assists: 5, teamId: manCity.id } }),
    prisma.player.create({ data: { name: 'كيفن دي بروين', nameEn: 'Kevin De Bruyne', position: 'MID', number: 17, age: 34, nationality: 'بلجيكي', goals: 6, assists: 16, teamId: manCity.id } }),

    // Arsenal players
    prisma.player.create({ data: { name: 'بوكايو ساكا', nameEn: 'Bukayo Saka', position: 'FWD', number: 7, age: 24, nationality: 'إنجليزي', goals: 14, assists: 10, teamId: arsenal.id } }),
    prisma.player.create({ data: { name: 'مارتن أوديغارد', nameEn: 'Martin Odegaard', position: 'MID', number: 8, age: 27, nationality: 'نرويجي', goals: 8, assists: 9, teamId: arsenal.id } }),

    // Chelsea players
    prisma.player.create({ data: { name: 'كول بالمر', nameEn: 'Cole Palmer', position: 'MID', number: 20, age: 23, nationality: 'إنجليزي', goals: 15, assists: 8, teamId: chelsea.id } }),

    // Real Madrid players
    prisma.player.create({ data: { name: 'كيليان مبابي', nameEn: 'Kylian Mbappe', position: 'FWD', number: 9, age: 27, nationality: 'فرنسي', goals: 20, assists: 7, teamId: realMadrid.id } }),
    prisma.player.create({ data: { name: 'فينيسيوس جونيور', nameEn: 'Vinicius Junior', position: 'FWD', number: 7, age: 25, nationality: 'برازيلي', goals: 16, assists: 9, teamId: realMadrid.id } }),
    prisma.player.create({ data: { name: 'جود بيلينغهام', nameEn: 'Jude Bellingham', position: 'MID', number: 5, age: 22, nationality: 'إنجليزي', goals: 10, assists: 8, teamId: realMadrid.id } }),

    // Barcelona players
    prisma.player.create({ data: { name: 'روبرت ليفاندوفسكي', nameEn: 'Robert Lewandowski', position: 'FWD', number: 9, age: 37, nationality: 'بولندي', goals: 18, assists: 4, teamId: barcelona.id } }),
    prisma.player.create({ data: { name: 'لامين يامال', nameEn: 'Lamine Yamal', position: 'FWD', number: 19, age: 18, nationality: 'إسباني', goals: 9, assists: 12, teamId: barcelona.id } }),

    // Atletico Madrid players
    prisma.player.create({ data: { name: 'أنطوان غريزمان', nameEn: 'Antoine Griezmann', position: 'FWD', number: 7, age: 34, nationality: 'فرنسي', goals: 12, assists: 6, teamId: atleticoMadrid.id } }),

    // Al Ahly players
    prisma.player.create({ data: { name: 'محمد الشناوي', nameEn: 'Mohamed El Shenawy', position: 'GK', number: 1, age: 36, nationality: 'مصري', goals: 0, assists: 0, teamId: ahly.id } }),
    prisma.player.create({ data: { name: 'حسين الشحات', nameEn: 'Hussein El Shahat', position: 'MID', number: 18, age: 32, nationality: 'مصري', goals: 8, assists: 7, teamId: ahly.id } }),
    prisma.player.create({ data: { name: 'محمد شريف', nameEn: 'Mohamed Sherif', position: 'FWD', number: 9, age: 30, nationality: 'مصري', goals: 14, assists: 3, teamId: ahly.id } }),

    // Zamalek players
    prisma.player.create({ data: { name: 'أحمد فتوح', nameEn: 'Ahmed Fatouh', position: 'DEF', number: 3, age: 28, nationality: 'مصري', goals: 2, assists: 5, teamId: zamalek.id } }),
    prisma.player.create({ data: { name: 'عمر السعيد', nameEn: 'Omar El Said', position: 'FWD', number: 10, age: 30, nationality: 'مصري', goals: 11, assists: 4, teamId: zamalek.id } }),

    // Ismaily players
    prisma.player.create({ data: { name: 'أحمد رفعت', nameEn: 'Ahmed Refaat', position: 'MID', number: 8, age: 28, nationality: 'مصري', goals: 5, assists: 6, teamId: ismaily.id } }),

    // Masry players
    prisma.player.create({ data: { name: 'أحمد الشيخ', nameEn: 'Ahmed El Sheikh', position: 'FWD', number: 7, age: 31, nationality: 'مصري', goals: 7, assists: 3, teamId: masry.id } }),

    // Pyramids players
    prisma.player.create({ data: { name: 'عبدالله السعيد', nameEn: 'Abdallah El Said', position: 'MID', number: 10, age: 39, nationality: 'مصري', goals: 9, assists: 8, teamId: pyramids.id } }),

    // Al Hilal players
    prisma.player.create({ data: { name: 'نيمار', nameEn: 'Neymar', position: 'FWD', number: 10, age: 34, nationality: 'برازيلي', goals: 8, assists: 6, teamId: hilal.id } }),
    prisma.player.create({ data: { name: 'سالم الدوسري', nameEn: 'Salem Al Dawsari', position: 'MID', number: 8, age: 34, nationality: 'سعودي', goals: 12, assists: 9, teamId: hilal.id } }),

    // Al Nassr players
    prisma.player.create({ data: { name: 'كريستيانو رونالدو', nameEn: 'Cristiano Ronaldo', position: 'FWD', number: 7, age: 41, nationality: 'برتغالي', goals: 23, assists: 5, teamId: nassr.id } }),
    prisma.player.create({ data: { name: 'ساديو ماني', nameEn: 'Sadio Mane', position: 'FWD', number: 10, age: 33, nationality: 'سنغالي', goals: 11, assists: 7, teamId: nassr.id } }),

    // Al Ahli Saudi players
    prisma.player.create({ data: { name: 'روبيرتو فيرمينو', nameEn: 'Roberto Firmino', position: 'FWD', number: 9, age: 34, nationality: 'برازيلي', goals: 10, assists: 6, teamId: ahliSaudi.id } }),

    // Al Ittihad players
    prisma.player.create({ data: { name: 'كريم بنزيما', nameEn: 'Karim Benzema', position: 'FWD', number: 9, age: 38, nationality: 'فرنسي', goals: 17, assists: 6, teamId: ittihad.id } }),
    prisma.player.create({ data: { name: 'كانتي', nameEn: "N'Golo Kante", position: 'MID', number: 4, age: 34, nationality: 'فرنسي', goals: 2, assists: 4, teamId: ittihad.id } }),

    // Al Ettifaq players
    prisma.player.create({ data: { name: 'جوردان هندرسون', nameEn: 'Jordan Henderson', position: 'MID', number: 8, age: 35, nationality: 'إنجليزي', goals: 3, assists: 7, teamId: ettefaq.id } }),
  ])

  // Build player lookup by English name for easy reference
  const playerMap: Record<string, typeof players[0]> = {}
  for (const p of players) {
    if (p.nameEn) playerMap[p.nameEn] = p
  }

  console.log(`✅ تم إنشاء ${players.length} لاعب`)

  // ===== المباريات =====
  console.log('🏟️ إنشاء المباريات...')

  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  const matches = await Promise.all([
    // ===== مباريات منتهية (الأسبوع الماضي) =====
    prisma.match.create({
      data: {
        homeTeamId: ahly.id, awayTeamId: zamalek.id, leagueId: egyptianLeague.id,
        homeScore: 2, awayScore: 1, status: 'finished',
        matchDate: new Date(today.getTime() - 6 * 86400000), // 6 days ago
        stadium: 'ستاد السلام الدولي', referee: 'محمد الحنفي', round: 'الجولة 22',
        matchday: 22,
        homePossession: 55, awayPossession: 45,
        homeShots: 14, awayShots: 9,
        homeShotsOnTarget: 6, awayShotsOnTarget: 3,
        homeCorners: 5, awayCorners: 3,
        homeFouls: 12, awayFouls: 15,
        homeYellowCards: 2, awayYellowCards: 3,
        homeRedCards: 0, awayRedCards: 0,
        broadcastChannels: 'ON Sport',
      },
    }),
    prisma.match.create({
      data: {
        homeTeamId: hilal.id, awayTeamId: nassr.id, leagueId: saudiLeague.id,
        homeScore: 3, awayScore: 2, status: 'finished',
        matchDate: new Date(today.getTime() - 5 * 86400000),
        stadium: 'ستاد الملك فهد الدولي', referee: 'محمد الهويش', round: 'الجولة 24',
        matchday: 24,
        homePossession: 48, awayPossession: 52,
        homeShots: 16, awayShots: 13,
        homeShotsOnTarget: 8, awayShotsOnTarget: 5,
        homeCorners: 6, awayCorners: 4,
        homeFouls: 10, awayFouls: 13,
        homeYellowCards: 1, awayYellowCards: 4,
        homeRedCards: 0, awayRedCards: 0,
        broadcastChannels: 'SSC',
      },
    }),
    prisma.match.create({
      data: {
        homeTeamId: liverpool.id, awayTeamId: manCity.id, leagueId: epl.id,
        homeScore: 2, awayScore: 0, status: 'finished',
        matchDate: new Date(today.getTime() - 4 * 86400000),
        stadium: 'أنفيلد', referee: 'مايكل أوليفر', round: 'الجولة 29',
        matchday: 29,
        homePossession: 42, awayPossession: 58,
        homeShots: 11, awayShots: 15,
        homeShotsOnTarget: 5, awayShotsOnTarget: 2,
        homeCorners: 3, awayCorners: 7,
        homeFouls: 9, awayFouls: 7,
        homeYellowCards: 2, awayYellowCards: 1,
        homeRedCards: 0, awayRedCards: 0,
        broadcastChannels: 'beIN Sports',
      },
    }),
    prisma.match.create({
      data: {
        homeTeamId: realMadrid.id, awayTeamId: barcelona.id, leagueId: laliga.id,
        homeScore: 2, awayScore: 2, status: 'finished',
        matchDate: new Date(today.getTime() - 3 * 86400000),
        stadium: 'سانتياغو برنابيو', referee: 'أنطونيو ماتيو لاهوز', round: 'الجولة 28',
        matchday: 28,
        homePossession: 50, awayPossession: 50,
        homeShots: 18, awayShots: 16,
        homeShotsOnTarget: 7, awayShotsOnTarget: 6,
        homeCorners: 5, awayCorners: 6,
        homeFouls: 11, awayFouls: 10,
        homeYellowCards: 3, awayYellowCards: 2,
        homeRedCards: 0, awayRedCards: 0,
        broadcastChannels: 'beIN Sports',
      },
    }),
    prisma.match.create({
      data: {
        homeTeamId: ittihad.id, awayTeamId: ahliSaudi.id, leagueId: saudiLeague.id,
        homeScore: 1, awayScore: 1, status: 'finished',
        matchDate: new Date(today.getTime() - 2 * 86400000),
        stadium: 'ستاد مدينة الملك عبدالله الرياضية', referee: 'خالد الطريس', round: 'الجولة 24',
        matchday: 24,
        homePossession: 53, awayPossession: 47,
        homeShots: 12, awayShots: 10,
        homeShotsOnTarget: 4, awayShotsOnTarget: 3,
        homeCorners: 5, awayCorners: 4,
        homeFouls: 8, awayFouls: 11,
        homeYellowCards: 2, awayYellowCards: 3,
        homeRedCards: 0, awayRedCards: 0,
        broadcastChannels: 'SSC',
      },
    }),
    prisma.match.create({
      data: {
        homeTeamId: arsenal.id, awayTeamId: chelsea.id, leagueId: epl.id,
        homeScore: 3, awayScore: 1, status: 'finished',
        matchDate: new Date(today.getTime() - 1 * 86400000),
        stadium: 'الإمارات', referee: 'أنتوني تايلور', round: 'الجولة 29',
        matchday: 29,
        homePossession: 60, awayPossession: 40,
        homeShots: 17, awayShots: 7,
        homeShotsOnTarget: 7, awayShotsOnTarget: 2,
        homeCorners: 8, awayCorners: 2,
        homeFouls: 6, awayFouls: 10,
        homeYellowCards: 1, awayYellowCards: 2,
        homeRedCards: 0, awayRedCards: 0,
        broadcastChannels: 'beIN Sports',
      },
    }),
    prisma.match.create({
      data: {
        homeTeamId: ismaily.id, awayTeamId: masry.id, leagueId: egyptianLeague.id,
        homeScore: 0, awayScore: 0, status: 'finished',
        matchDate: new Date(today.getTime() - 3 * 86400000),
        stadium: 'ستاد الإسماعيلية', referee: 'إبراهيم نور', round: 'الجولة 22',
        matchday: 22,
        homePossession: 52, awayPossession: 48,
        homeShots: 8, awayShots: 6,
        homeShotsOnTarget: 2, awayShotsOnTarget: 1,
        homeCorners: 4, awayCorners: 3,
        homeFouls: 14, awayFouls: 12,
        homeYellowCards: 3, awayYellowCards: 2,
        homeRedCards: 0, awayRedCards: 0,
        broadcastChannels: 'ON Sport',
      },
    }),

    // ===== مباريات مباشرة اليوم =====
    prisma.match.create({
      data: {
        homeTeamId: ahly.id, awayTeamId: pyramids.id, leagueId: egyptianLeague.id,
        homeScore: 1, awayScore: 0, status: 'live',
        matchDate: new Date(today.getTime() + 2 * 3600000), // 2 hours from now
        stadium: 'ستاد السلام الدولي', round: 'الجولة 23',
        matchday: 23,
        homePossession: 58, awayPossession: 42,
        homeShots: 7, awayShots: 3,
        homeShotsOnTarget: 3, awayShotsOnTarget: 1,
        homeCorners: 3, awayCorners: 1,
        homeFouls: 5, awayFouls: 7,
        homeYellowCards: 1, awayYellowCards: 2,
        broadcastChannels: 'ON Sport',
      },
    }),
    prisma.match.create({
      data: {
        homeTeamId: nassr.id, awayTeamId: ettefaq.id, leagueId: saudiLeague.id,
        homeScore: 0, awayScore: 0, status: 'halftime',
        matchDate: new Date(today.getTime() + 1 * 3600000),
        stadium: 'استاد مرسول بارك', round: 'الجولة 25',
        matchday: 25,
        homePossession: 62, awayPossession: 38,
        homeShots: 8, awayShots: 2,
        homeShotsOnTarget: 3, awayShotsOnTarget: 0,
        homeCorners: 4, awayCorners: 1,
        homeFouls: 3, awayFouls: 8,
        homeYellowCards: 0, awayYellowCards: 2,
        broadcastChannels: 'SSC',
      },
    }),

    // ===== مباريات قادمة =====
    prisma.match.create({
      data: {
        homeTeamId: zamalek.id, awayTeamId: ismaily.id, leagueId: egyptianLeague.id,
        status: 'upcoming',
        matchDate: new Date(today.getTime() + 1 * 86400000), // tomorrow
        stadium: 'ستاد القاهرة الدولي', round: 'الجولة 23',
        matchday: 23,
        broadcastChannels: 'ON Sport',
      },
    }),
    prisma.match.create({
      data: {
        homeTeamId: chelsea.id, awayTeamId: liverpool.id, leagueId: epl.id,
        status: 'upcoming',
        matchDate: new Date(today.getTime() + 2 * 86400000),
        stadium: 'ستامفورد بريدج', round: 'الجولة 30',
        matchday: 30,
        broadcastChannels: 'beIN Sports',
      },
    }),
    prisma.match.create({
      data: {
        homeTeamId: barcelona.id, awayTeamId: atleticoMadrid.id, leagueId: laliga.id,
        status: 'upcoming',
        matchDate: new Date(today.getTime() + 2 * 86400000),
        stadium: 'كامب نو', round: 'الجولة 29',
        matchday: 29,
        broadcastChannels: 'beIN Sports',
      },
    }),
    prisma.match.create({
      data: {
        homeTeamId: ahly.id, awayTeamId: zamalek.id, leagueId: cafChampions.id,
        status: 'upcoming',
        matchDate: new Date(today.getTime() + 5 * 86400000),
        stadium: 'ستاد القاهرة الدولي', round: 'نصف النهائي',
        matchday: 1,
        broadcastChannels: 'beIN Sports, ON Sport',
      },
    }),
    prisma.match.create({
      data: {
        homeTeamId: manCity.id, awayTeamId: realMadrid.id, leagueId: ucl.id,
        status: 'upcoming',
        matchDate: new Date(today.getTime() + 4 * 86400000),
        stadium: 'الاتحاد', round: 'دور الـ16',
        matchday: 1,
        broadcastChannels: 'beIN Sports',
      },
    }),
    prisma.match.create({
      data: {
        homeTeamId: liverpool.id, awayTeamId: arsenal.id, leagueId: ucl.id,
        status: 'upcoming',
        matchDate: new Date(today.getTime() + 5 * 86400000),
        stadium: 'أنفيلد', round: 'دور الـ16',
        matchday: 1,
        broadcastChannels: 'beIN Sports',
      },
    }),
  ])

  const [
    matchAhlyZamalek, matchHilalNassr, matchLivCity, matchRealBarca,
    matchIttihadAhli, matchArsenalChelsea, matchIsmailyMasry,
    matchAhlyPyramidsLive, matchNassrEttefaqLive,
    matchZamalekIsmailyUp, matchChelseaLivUp, matchBarcaAtmUp,
    matchAhlyZamalekCAF, matchCityRealUCL, matchLivArsenalUCL,
  ] = matches

  console.log(`✅ تم إنشاء ${matches.length} مباراة`)

  // ===== أحداث المباريات =====
  console.log('📝 إنشاء أحداث المباريات...')

  const matchEvents = await Promise.all([
    // Ahly 2-1 Zamalek (Egyptian League)
    prisma.matchEvent.create({ data: { matchId: matchAhlyZamalek.id, type: 'goal', minute: 15, team: 'home', playerId: playerMap['Mohamed Sherif'].id, detail: 'هدف رائع من داخل منطقة الجزاء' } }),
    prisma.matchEvent.create({ data: { matchId: matchAhlyZamalek.id, type: 'yellow_card', minute: 23, team: 'away', playerId: playerMap['Ahmed Fatouh'].id } }),
    prisma.matchEvent.create({ data: { matchId: matchAhlyZamalek.id, type: 'goal', minute: 38, team: 'away', playerId: playerMap['Omar El Said'].id, assistPlayerId: playerMap['Ahmed Fatouh'].id, detail: 'تعادل الزمالك' } }),
    prisma.matchEvent.create({ data: { matchId: matchAhlyZamalek.id, type: 'substitution', minute: 60, team: 'home', detail: 'نزول طاهر محمد طه بدلاً من حسين الشحات' } }),
    prisma.matchEvent.create({ data: { matchId: matchAhlyZamalek.id, type: 'goal', minute: 78, team: 'home', playerId: playerMap['Hussein El Shahat'].id, detail: 'هدف الفوز للأهلي!' } }),
    prisma.matchEvent.create({ data: { matchId: matchAhlyZamalek.id, type: 'yellow_card', minute: 85, team: 'home', playerId: playerMap['Mohamed El Shenawy'].id } }),
    prisma.matchEvent.create({ data: { matchId: matchAhlyZamalek.id, type: 'fulltime', minute: 90, team: 'home', detail: 'نهاية المباراة - فوز الأهلي 2-1' } }),

    // Hilal 3-2 Nassr
    prisma.matchEvent.create({ data: { matchId: matchHilalNassr.id, type: 'goal', minute: 12, team: 'home', playerId: playerMap['Salem Al Dawsari'].id, detail: 'افتتاح التسجيل للهلال' } }),
    prisma.matchEvent.create({ data: { matchId: matchHilalNassr.id, type: 'goal', minute: 25, team: 'away', playerId: playerMap['Cristiano Ronaldo'].id, detail: 'تعادل رونالدو!' } }),
    prisma.matchEvent.create({ data: { matchId: matchHilalNassr.id, type: 'yellow_card', minute: 33, team: 'away', playerId: playerMap['Sadio Mane'].id } }),
    prisma.matchEvent.create({ data: { matchId: matchHilalNassr.id, type: 'goal', minute: 44, team: 'home', playerId: playerMap['Neymar'].id, assistPlayerId: playerMap['Salem Al Dawsari'].id, detail: 'هدف نيمار الرائع!' } }),
    prisma.matchEvent.create({ data: { matchId: matchHilalNassr.id, type: 'halftime', minute: 45, team: 'home', detail: 'نهاية الشوط الأول 2-1' } }),
    prisma.matchEvent.create({ data: { matchId: matchHilalNassr.id, type: 'goal', minute: 55, team: 'away', playerId: playerMap['Sadio Mane'].id, assistPlayerId: playerMap['Cristiano Ronaldo'].id, detail: 'تعادل النصر!' } }),
    prisma.matchEvent.create({ data: { matchId: matchHilalNassr.id, type: 'yellow_card', minute: 68, team: 'home', detail: 'بطاقة صفراء للهلال' } }),
    prisma.matchEvent.create({ data: { matchId: matchHilalNassr.id, type: 'goal', minute: 82, team: 'home', playerId: playerMap['Salem Al Dawsari'].id, detail: 'هدف الفوز للهلال!' } }),
    prisma.matchEvent.create({ data: { matchId: matchHilalNassr.id, type: 'fulltime', minute: 90, team: 'home', detail: 'نهاية المباراة - فوز الهلال 3-2' } }),

    // Liverpool 2-0 Man City
    prisma.matchEvent.create({ data: { matchId: matchLivCity.id, type: 'goal', minute: 20, team: 'home', playerId: playerMap['Mohamed Salah'].id, assistPlayerId: playerMap['Darwin Nunez'].id, detail: 'هدف صلاح الخارق!' } }),
    prisma.matchEvent.create({ data: { matchId: matchLivCity.id, type: 'yellow_card', minute: 35, team: 'away', detail: 'بطاقة صفراء لمانشستر سيتي' } }),
    prisma.matchEvent.create({ data: { matchId: matchLivCity.id, type: 'halftime', minute: 45, team: 'home', detail: 'نهاية الشوط الأول 1-0' } }),
    prisma.matchEvent.create({ data: { matchId: matchLivCity.id, type: 'goal', minute: 72, team: 'home', playerId: playerMap['Mohamed Salah'].id, detail: 'الثنائية لصلاح!' } }),
    prisma.matchEvent.create({ data: { matchId: matchLivCity.id, type: 'yellow_card', minute: 80, team: 'home', playerId: playerMap['Virgil van Dijk'].id } }),
    prisma.matchEvent.create({ data: { matchId: matchLivCity.id, type: 'fulltime', minute: 90, team: 'home', detail: 'نهاية المباراة - فوز ليفربول 2-0' } }),

    // Real Madrid 2-2 Barcelona
    prisma.matchEvent.create({ data: { matchId: matchRealBarca.id, type: 'goal', minute: 8, team: 'home', playerId: playerMap['Kylian Mbappe'].id, detail: 'مبابي يفتتح التسجيل!' } }),
    prisma.matchEvent.create({ data: { matchId: matchRealBarca.id, type: 'goal', minute: 22, team: 'away', playerId: playerMap['Robert Lewandowski'].id, detail: 'ليفاندوفسكي يعادل!' } }),
    prisma.matchEvent.create({ data: { matchId: matchRealBarca.id, type: 'yellow_card', minute: 30, team: 'home', playerId: playerMap['Vinicius Junior'].id } }),
    prisma.matchEvent.create({ data: { matchId: matchRealBarca.id, type: 'goal', minute: 56, team: 'home', playerId: playerMap['Vinicius Junior'].id, assistPlayerId: playerMap['Jude Bellingham'].id, detail: 'فينيسيوس يسجل الثاني!' } }),
    prisma.matchEvent.create({ data: { matchId: matchRealBarca.id, type: 'substitution', minute: 65, team: 'away', detail: 'نزول فيرمين لوبيز بدلاً من ليفاندوفسكي' } }),
    prisma.matchEvent.create({ data: { matchId: matchRealBarca.id, type: 'goal', minute: 88, team: 'away', playerId: playerMap['Lamine Yamal'].id, detail: 'يامال يسجل هدف التعادل في الدقائق الأخيرة!' } }),
    prisma.matchEvent.create({ data: { matchId: matchRealBarca.id, type: 'fulltime', minute: 90, team: 'home', detail: 'نهاية المباراة - تعادل 2-2' } }),

    // Arsenal 3-1 Chelsea
    prisma.matchEvent.create({ data: { matchId: matchArsenalChelsea.id, type: 'goal', minute: 11, team: 'home', playerId: playerMap['Bukayo Saka'].id, detail: 'ساكا يفتتح التسجيل!' } }),
    prisma.matchEvent.create({ data: { matchId: matchArsenalChelsea.id, type: 'goal', minute: 34, team: 'home', playerId: playerMap['Martin Odegaard'].id, assistPlayerId: playerMap['Bukayo Saka'].id, detail: 'أوديغارد يضيف الثاني!' } }),
    prisma.matchEvent.create({ data: { matchId: matchArsenalChelsea.id, type: 'goal', minute: 50, team: 'away', playerId: playerMap['Cole Palmer'].id, detail: 'بالمر يقلص الفارق!' } }),
    prisma.matchEvent.create({ data: { matchId: matchArsenalChelsea.id, type: 'yellow_card', minute: 62, team: 'away', detail: 'بطاقة صفراء لتشيلسي' } }),
    prisma.matchEvent.create({ data: { matchId: matchArsenalChelsea.id, type: 'goal', minute: 77, team: 'home', playerId: playerMap['Bukayo Saka'].id, detail: 'ساكا يسجل الثنائية!' } }),
    prisma.matchEvent.create({ data: { matchId: matchArsenalChelsea.id, type: 'fulltime', minute: 90, team: 'home', detail: 'نهاية المباراة - فوز أرسنال 3-1' } }),

    // Ahly 1-0 Pyramids (Live)
    prisma.matchEvent.create({ data: { matchId: matchAhlyPyramidsLive.id, type: 'goal', minute: 33, team: 'home', playerId: playerMap['Mohamed Sherif'].id, detail: 'شريف يسجل للأهلي!' } }),
    prisma.matchEvent.create({ data: { matchId: matchAhlyPyramidsLive.id, type: 'yellow_card', minute: 40, team: 'away', detail: 'بطاقة صفراء لبيراميدز' } }),
  ])

  console.log(`✅ تم إنشاء ${matchEvents.length} حدث مباراة`)

  // ===== الترتيب =====
  console.log('📊 إنشاء الترتيب...')

  // Egyptian League Standings
  const egyptStandings = await Promise.all([
    prisma.standing.create({ data: { leagueId: egyptianLeague.id, teamId: ahly.id, season: '2025-2026', position: 1, played: 22, won: 17, drawn: 3, lost: 2, goalsFor: 45, goalsAgainst: 14, goalDifference: 31, points: 54, form: 'WWWWD' } }),
    prisma.standing.create({ data: { leagueId: egyptianLeague.id, teamId: zamalek.id, season: '2025-2026', position: 2, played: 22, won: 14, drawn: 5, lost: 3, goalsFor: 38, goalsAgainst: 18, goalDifference: 20, points: 47, form: 'WDWLW' } }),
    prisma.standing.create({ data: { leagueId: egyptianLeague.id, teamId: pyramids.id, season: '2025-2026', position: 3, played: 22, won: 12, drawn: 6, lost: 4, goalsFor: 32, goalsAgainst: 20, goalDifference: 12, points: 42, form: 'WDDWL' } }),
    prisma.standing.create({ data: { leagueId: egyptianLeague.id, teamId: ismaily.id, season: '2025-2026', position: 4, played: 22, won: 10, drawn: 7, lost: 5, goalsFor: 28, goalsAgainst: 22, goalDifference: 6, points: 37, form: 'DLWDL' } }),
    prisma.standing.create({ data: { leagueId: egyptianLeague.id, teamId: masry.id, season: '2025-2026', position: 5, played: 22, won: 8, drawn: 8, lost: 6, goalsFor: 24, goalsAgainst: 21, goalDifference: 3, points: 32, form: 'DLDWL' } }),
  ])

  // Saudi League Standings
  const saudiStandings = await Promise.all([
    prisma.standing.create({ data: { leagueId: saudiLeague.id, teamId: hilal.id, season: '2025-2026', position: 1, played: 24, won: 19, drawn: 3, lost: 2, goalsFor: 58, goalsAgainst: 18, goalDifference: 40, points: 60, form: 'WWWWW' } }),
    prisma.standing.create({ data: { leagueId: saudiLeague.id, teamId: nassr.id, season: '2025-2026', position: 2, played: 24, won: 16, drawn: 4, lost: 4, goalsFor: 52, goalsAgainst: 25, goalDifference: 27, points: 52, form: 'WLWWL' } }),
    prisma.standing.create({ data: { leagueId: saudiLeague.id, teamId: ittihad.id, season: '2025-2026', position: 3, played: 24, won: 15, drawn: 5, lost: 4, goalsFor: 48, goalsAgainst: 22, goalDifference: 26, points: 50, form: 'WDWWL' } }),
    prisma.standing.create({ data: { leagueId: saudiLeague.id, teamId: ahliSaudi.id, season: '2025-2026', position: 4, played: 24, won: 13, drawn: 6, lost: 5, goalsFor: 40, goalsAgainst: 24, goalDifference: 16, points: 45, form: 'DWDLW' } }),
    prisma.standing.create({ data: { leagueId: saudiLeague.id, teamId: ettefaq.id, season: '2025-2026', position: 5, played: 24, won: 9, drawn: 8, lost: 7, goalsFor: 30, goalsAgainst: 28, goalDifference: 2, points: 35, form: 'DLDLD' } }),
  ])

  // EPL Standings
  const eplStandings = await Promise.all([
    prisma.standing.create({ data: { leagueId: epl.id, teamId: liverpool.id, season: '2025-2026', position: 1, played: 29, won: 22, drawn: 4, lost: 3, goalsFor: 65, goalsAgainst: 22, goalDifference: 43, points: 70, form: 'WWWDW' } }),
    prisma.standing.create({ data: { leagueId: epl.id, teamId: arsenal.id, season: '2025-2026', position: 2, played: 29, won: 20, drawn: 5, lost: 4, goalsFor: 58, goalsAgainst: 24, goalDifference: 34, points: 65, form: 'WLWWW' } }),
    prisma.standing.create({ data: { leagueId: epl.id, teamId: manCity.id, season: '2025-2026', position: 3, played: 29, won: 18, drawn: 6, lost: 5, goalsFor: 62, goalsAgainst: 30, goalDifference: 32, points: 60, form: 'WDWLW' } }),
    prisma.standing.create({ data: { leagueId: epl.id, teamId: chelsea.id, season: '2025-2026', position: 4, played: 29, won: 15, drawn: 7, lost: 7, goalsFor: 50, goalsAgainst: 35, goalDifference: 15, points: 52, form: 'LWDWL' } }),
  ])

  // La Liga Standings
  const laligaStandings = await Promise.all([
    prisma.standing.create({ data: { leagueId: laliga.id, teamId: barcelona.id, season: '2025-2026', position: 1, played: 28, won: 21, drawn: 4, lost: 3, goalsFor: 64, goalsAgainst: 22, goalDifference: 42, points: 67, form: 'WDWWW' } }),
    prisma.standing.create({ data: { leagueId: laliga.id, teamId: realMadrid.id, season: '2025-2026', position: 2, played: 28, won: 19, drawn: 5, lost: 4, goalsFor: 60, goalsAgainst: 25, goalDifference: 35, points: 62, form: 'DWLWW' } }),
    prisma.standing.create({ data: { leagueId: laliga.id, teamId: atleticoMadrid.id, season: '2025-2026', position: 3, played: 28, won: 17, drawn: 6, lost: 5, goalsFor: 45, goalsAgainst: 24, goalDifference: 21, points: 57, form: 'WWDWL' } }),
  ])

  const allStandings = [...egyptStandings, ...saudiStandings, ...eplStandings, ...laligaStandings]
  console.log(`✅ تم إنشاء ${allStandings.length} سجل ترتيب`)

  // ===== الهدافون =====
  console.log('🎯 إنشاء جدول الهدافين...')

  const topScorers = await Promise.all([
    // Egyptian League
    prisma.topScorer.create({ data: { leagueId: egyptianLeague.id, playerId: playerMap['Mohamed Sherif'].id, teamId: ahly.id, goals: 14, assists: 3, penaltyGoals: 3 } }),
    prisma.topScorer.create({ data: { leagueId: egyptianLeague.id, playerId: playerMap['Omar El Said'].id, teamId: zamalek.id, goals: 11, assists: 4, penaltyGoals: 2 } }),
    prisma.topScorer.create({ data: { leagueId: egyptianLeague.id, playerId: playerMap['Abdallah El Said'].id, teamId: pyramids.id, goals: 9, assists: 8, penaltyGoals: 4 } }),

    // Saudi League
    prisma.topScorer.create({ data: { leagueId: saudiLeague.id, playerId: playerMap['Cristiano Ronaldo'].id, teamId: nassr.id, goals: 23, assists: 5, penaltyGoals: 6 } }),
    prisma.topScorer.create({ data: { leagueId: saudiLeague.id, playerId: playerMap['Karim Benzema'].id, teamId: ittihad.id, goals: 17, assists: 6, penaltyGoals: 4 } }),
    prisma.topScorer.create({ data: { leagueId: saudiLeague.id, playerId: playerMap['Salem Al Dawsari'].id, teamId: hilal.id, goals: 12, assists: 9, penaltyGoals: 1 } }),
    prisma.topScorer.create({ data: { leagueId: saudiLeague.id, playerId: playerMap['Roberto Firmino'].id, teamId: ahliSaudi.id, goals: 10, assists: 6, penaltyGoals: 2 } }),

    // EPL
    prisma.topScorer.create({ data: { leagueId: epl.id, playerId: playerMap['Erling Haaland'].id, teamId: manCity.id, goals: 25, assists: 5, penaltyGoals: 5 } }),
    prisma.topScorer.create({ data: { leagueId: epl.id, playerId: playerMap['Mohamed Salah'].id, teamId: liverpool.id, goals: 22, assists: 13, penaltyGoals: 4 } }),
    prisma.topScorer.create({ data: { leagueId: epl.id, playerId: playerMap['Cole Palmer'].id, teamId: chelsea.id, goals: 15, assists: 8, penaltyGoals: 3 } }),
    prisma.topScorer.create({ data: { leagueId: epl.id, playerId: playerMap['Bukayo Saka'].id, teamId: arsenal.id, goals: 14, assists: 10, penaltyGoals: 1 } }),

    // La Liga
    prisma.topScorer.create({ data: { leagueId: laliga.id, playerId: playerMap['Kylian Mbappe'].id, teamId: realMadrid.id, goals: 20, assists: 7, penaltyGoals: 3 } }),
    prisma.topScorer.create({ data: { leagueId: laliga.id, playerId: playerMap['Robert Lewandowski'].id, teamId: barcelona.id, goals: 18, assists: 4, penaltyGoals: 5 } }),
    prisma.topScorer.create({ data: { leagueId: laliga.id, playerId: playerMap['Vinicius Junior'].id, teamId: realMadrid.id, goals: 16, assists: 9, penaltyGoals: 0 } }),
  ])

  console.log(`✅ تم إنشاء ${topScorers.length} سجل هداف`)

  // ===== المقالات =====
  console.log('📰 إنشاء المقالات...')

  const articles = await Promise.all([
    // Breaking News
    prisma.article.create({
      data: {
        title: 'صلاح يقود ليفربول لفوز تاريخي على مانشستر سيتي في أنفيلد',
        slug: 'salah-liverpool-historic-win-mancity',
        summary: 'سجل محمد صلاح هدفين رائعين ليقود ليفربول لفوز مثير 2-0 على مانشستر سيتي في قمة الدوري الإنجليزي الممتاز، معززاً صدارته للفريق بفارق كبير عن أقرب ملاحقيه.',
        content: `شهد ملعب أنفيلد مباراة مثيرة من العيار الثقيل بين ليفربول ومانشستر سيتي في إطار الجولة 29 من الدوري الإنجليزي الممتاز، وانتهت بفوز أصحاب الأرض بهدفين نظيفين سجلهما النجم المصري محمد صلاح.

افتتح صلاح التسجيل في الدقيقة 20 بعد تمريرة ذكية من داروين نونيز، حيث انطلق من الجهة اليمنى ومرر الكرة بين قدمي المدافع قبل أن يسددها بقوة في الزاوية البعيدة للحارس إديرسون. كان الهدف بمثابة رسالة قوية من الفرعون المصري بأنه لا يزال في قمة عطائه.

وفي الشوط الثاني، عاد صلاح ليضيف الهدف الثاني في الدقيقة 72 بعد هجمة مرتدة سريعة، استلم فيها الكرة على حدود منطقة الجزاء وراوغ مدافعين قبل أن يسكن الشباك بلمسة فنية رائعة، ليؤكد أن ليفربول يسير بثبات نحو لقب الدوري.

أظهر ليفربول أداءً تكتيكياً منضبطاً تحت قيادة المدرب أرن سلوت، حيث سيطر على مجريات اللعب رغم امتلاك مانشستر سيتي لكرة أكبر. وبرزت شخصية فان دايك في الدفاع بقوة، فيما كان أليكساندر أرنولد مفتاحاً في الانتقال من الدفاع للهجوم.

بهذه النتيجة، ارتفع رصيد ليفربول إلى 70 نقطة في الصدارة بفارق 5 نقاط عن أرسنال الوصيف، فيما تجمد رصيد مانشستر سيتي عند 60 نقطة في المركز الثالث، مما يعقد مهمته في المنافسة على اللقب هذا الموسم.`,
        category: 'breaking',
        isBreaking: true,
        isFeatured: true,
        isPublished: true,
        status: 'published',
        authorId: adminUser.id,
        publishedAt: new Date(today.getTime() - 4 * 86400000),
        views: 45230,
        image: '/articles/salah-liverpool.jpg',
      },
    }),

    prisma.article.create({
      data: {
        title: 'رونالدو يطلب الرحيل عن النصر في نهاية الموسم',
        slug: 'ronaldo-leaving-nassr-end-season',
        summary: 'كشفت مصادر مقربة من النجم البرتغالي كريستيانو رونالدو عن رغبته في مغادرة نادي النصر السعودي بنهاية الموسم الحالي، وسط اهتمام من أندية أوروبية وأمريكية.',
        content: `في تطور مفاجئ، كشفت مصادر مقربة من النجم البرتغالي كريستيانو رونالدو أن اللاعب قد طلب إدارته بالتفاوض على رحيله عن نادي النصر السعودي بنهاية الموسم الحالي.

وجاء هذا القرار بعد سلسلة من النتائج المخيبة للآمال التي تعرض لها فريق النصر في الأسابيع الأخيرة، أبرزها الخسارة من الهلال 3-2 في ديربي الرياض، والتي رغم تسجيل رونالدو هدف التعادل فيها، إلا أن الفريق خسر في النهاية.

وأشارت المصادر إلى أن رونالدو يشعر بعدم الرضا عن المستوى العام للفريق والتنافسية في الدوري السعودي، ويود العودة إلى أوروبا أو التجربة الأمريكية قبل اعتزاله.

يُذكر أن رونالدو انضم للنصر في يناير 2023 بعقد يمتد حتى صيف 2025، وقد سجل حتى الآن 23 هدفاً في الدوري هذا الموسم، لكنه يبحث عن تحديات أعلى قبل إنهاء مسيرته الكروية.

من جانبها، لم تصدر إدارة النصر أي بيان رسمي حول هذا الموضوع، فيما ترددت أنباء عن اهتمام من أندية الدوري الأمريكي MLS وأندية في تركيا والبرتغال بالتعاقد مع اللاعب.`,
        category: 'breaking',
        isBreaking: true,
        isFeatured: true,
        isPublished: true,
        status: 'published',
        authorId: editorUser.id,
        publishedAt: new Date(today.getTime() - 1 * 86400000),
        views: 78450,
        image: '/articles/ronaldo-nassr.jpg',
      },
    }),

    prisma.article.create({
      data: {
        title: 'الأهلي المصري يحسم ديربي القاهرة بفوز ثمين على الزمالك 2-1',
        slug: 'ahly-wins-cairo-derby-zamalek',
        summary: 'حقق النادي الأهلي فوزاً مهماً على غريمه التقليدي الزمالك بهدفين مقابل هدف في لقاء قمة الجولة 22 من الدوري المصري الممتاز، ليعزز صدارته للترتيب.',
        content: `حسم النادي الأهلي ديربي القاهرة لصالحه بفوز صعب ثمين على غريمه التقليدي نادي الزمالك بهدفين مقابل هدف، في المباراة التي أقيمت على ستاد السلام الدولي ضمن الجولة 22 من الدوري المصري الممتاز.

افتتح محمد شريف التسجيل للأهلي في الدقيقة 15 بعد هجمة منظمة انتهت بتسديدة قوية من داخل منطقة الجزاء، قبل أن يعادل عمر السعيد النتيجة للزمالك في الدقيقة 38 بتسديدة رائعة من خارج منطقة الجزاء بعد تمريرة ذكية من أحمد فتوح.

وفي الشوط الثاني، ضغط الأهلي بقوة بحثاً عن هدف الفوز، وجاء الهدف في الدقيقة 78 عبر حسين الشحات الذي استغل تمريرة عرضية وسددها من لمسة واحدة في الشباك، لينفجر ستاد السلام بفرحة الجماهير الحمراء.

بهذا الفوز، رفع الأهلي رصيده إلى 54 نقطة في الصدارة بفارق 7 نقاط عن الزمالك الوصيف، مما يقربه خطوة كبيرة من الاحتفاظ بلقب الدوري للموسم الثاني على التوالي.`,
        category: 'breaking',
        isBreaking: true,
        isFeatured: false,
        isPublished: true,
        status: 'published',
        authorId: editorUser.id,
        publishedAt: new Date(today.getTime() - 6 * 86400000),
        views: 35600,
        image: '/articles/ahly-zamalek-derby.jpg',
      },
    }),

    prisma.article.create({
      data: {
        title: 'نيمار يعود للملاعب بعد إصابة طويلة ويقود الهلال للفوز في الديربي',
        slug: 'neymar-returns-injury-hilal-derby',
        summary: 'عاد النجم البرازيلي نيمار للمشاركة مع الهلال بعد غياب طويل بسبب الإصابة، وقدم أداءً رائعاً وسجل هدفاً في فوز فريقه 3-2 على النصر في ديربي الرياض.',
        content: `شهد ديربي الرياض بين الهلال والنصر عودة ميمونة للنجم البرازيلي نيمار الذي غاب عن الملاعب لفترة طويلة بسبب الإصابة، وقدم أداءً استثنائياً يؤكد جاهزيته البدنية والفنية.

سجل نيمار هدفاً رائعاً في الدقيقة 44 بعد مراوغة ساحرة لمدافعين، مسجلاً الهدف الثاني لفريقه قبل نهاية الشوط الأول. وشارك بشكل فعال في بناء الهجمات وخلق المساحات لزملائه طوال فترة تواجده في المباراة.

أشاد مدرب الهلال بالمستوى الذي قدمه نيمار، مؤكداً أن عودته ستعزز من قوة الفريق في المرحلة المقبلة من الموسم، سواء في الدوري السعودي أو بطولة دوري أبطال آسيا.

وكان نيمار قد تعرض لإصابة في الركبة أبعدته عن الملاعب لأشهر عديدة، وترددت أنباء كثيرة حول مستقبله ومصيره مع الفريق، لكنه عاد بأقوى مما كان ليقود الهلال لفوز مهم في الديربي.`,
        category: 'breaking',
        isBreaking: true,
        isFeatured: true,
        isPublished: true,
        status: 'published',
        authorId: adminUser.id,
        publishedAt: new Date(today.getTime() - 5 * 86400000),
        views: 52800,
        image: '/articles/neymar-hilal-return.jpg',
      },
    }),

    // Featured articles
    prisma.article.create({
      data: {
        title: 'تحليل: لماذا يعتبر ليفربول المرشح الأول للقب دوري الأبطال هذا الموسم؟',
        slug: 'analysis-liverpool-ucl-favorites',
        summary: 'تحليل معمق لأسباب تفوق ليفربول وتأهله كمرشح أول لنيل لقب دوري أبطال أوروبا هذا الموسم، بقيادة محمد صلاح وأرن سلوت.',
        content: `يقدم ليفربول هذا الموسم أداءً استثنائياً يجعله المرشح الأول للفوز بلقب دوري أبطال أوروبا، بعد سلسلة من العروض القوية التي أبداها الفريق في دور المجموعات ودور الـ32.

يعود الفضل الأكبر في هذا التألق إلى الاستقرار التكتيكي الذي فرضه المدرب الهولندي أرن سلوت منذ توليه مسؤولية الفريق، حيث نجح في الحفاظ على الهوية الهجومية لليفربول مع إضافة انضباط دفاعي كان مفقوداً في المواسم الأخيرة.

محمد صلاح يبقى النجم الأبرز بـ 22 هدفاً و13 تمريرة حاسمة في الدوري، لكن التألق لا يقتصر عليه فقط. ففان دايك عاد لمستواه المعهود في قلب الدفاع، وأليكساندر أرنولد يقدم موسماً استثنائياً في صناعة اللعب من العمق.

كما شكلت صفقات الفريق الأخيرة إضافة نوعية، خاصة في خط الوسط الذي كان يمثل نقطة ضعف في المواسم السابقة. ونجح سلوت في بناء منظومة متكاملة قادرة على المنافسة على كل الجبهات.

مع اقتراب مواجهة دور الـ16 أمام أرسنال، يبدو ليفربول جاهزاً تماماً للمضي قدماً في البطولة والمنافسة بقوة على اللقب السابع في تاريخه.`,
        category: 'analysis',
        isBreaking: false,
        isFeatured: true,
        isPublished: true,
        status: 'published',
        authorId: adminUser.id,
        publishedAt: new Date(today.getTime() - 2 * 86400000),
        views: 28750,
        image: '/articles/liverpool-ucl-analysis.jpg',
      },
    }),

    prisma.article.create({
      data: {
        title: 'تقرير: الدوري السعودي يتحول إلى وجهة عالمية بفضل صفقات النجوم',
        slug: 'report-saudi-league-global-destination',
        summary: 'تقرير شامل حول التحول الكبير الذي شهدته دوري روشن السعودي مع وصول نجوم عالميين مثل رونالدو وبنزيما ونيمار وكانتي.',
        content: `شهد الدوري السعودي للمحترفين تحولاً جذرياً في السنتين الأخيرتين، حيث تحول من بطولة محلية إلى وجهة عالمية تجتذب أكبر نجوم كرة القدم العالمية.

بدأت رحلة التحول مع انضمام كريستيانو رونالدو للنصر في يناير 2023، وهو الذي فتح الباب واسعاً أمام موجة انتقالات النجوم الكبار. تلاه كريم بنزيما وإنغولو كانتي للاتحاد، ونيمار للهلال، وروبيرتو فيرمينو للأهلي السعودي.

لم تقتصر الصفقات على اللاعبين فقط، بل امتدت إلى الجهاز الفني والإداري، حيث استقطبت الأندية السعودية مدربين ذوي خبرة عالمية واستثمرت في البنية التحتية من ملاعب ومرافق تدريب.

وعلى صعيد المتابعين، ارتفعت نسبة مشاهدة الدوري السعودي بنسبة تزيد عن 300% مقارنة بالموسم السابق، وأصبحت المباريات تُبث في أكثر من 100 دولة حول العالم.

لكن التقرير يشير أيضاً إلى تحديات تواجه الدوري، أبرزها الحاجة إلى تطوير اللاعبين المحليين وضمان استدامة النمو المالي، بدلاً من الاعتماد الكلي على الإنفاق الحكومي.`,
        category: 'report',
        isBreaking: false,
        isFeatured: true,
        isPublished: true,
        status: 'published',
        authorId: editorUser.id,
        publishedAt: new Date(today.getTime() - 3 * 86400000),
        views: 19800,
        image: '/articles/saudi-league-report.jpg',
      },
    }),

    // Transfer news
    prisma.article.create({
      data: {
        title: 'بيراميدز يتفاوض مع مهاجم دولي أفريقي لتدعيم صفوفه',
        slug: 'pyramids-negotiating-african-striker',
        summary: 'كشفت مصادر أن نادي بيراميدز المصري يجري مفاوضات متقدمة مع مهاجم دولي أفريقي للتعاقد معه في فترة الانتقالات الصيفية القادمة.',
        content: `علمت "سبورت بلس" من مصادر مطلعة أن نادي بيراميدز يجري مفاوضات متقدمة مع مهاجم دولي أفريقي يلعب حالياً في الدوري الفرنسي، للتعاقد معه في فترة الانتقالات الصيفية القادمة.

وأشارت المصادر إلى أن إدارة بيراميدز تسعى لتدعيم خط الهجوم بلاعب من الطراز الرفيع يمكن أن يضيف خيارات تكتيكية لمدرب الفريق، خاصة في ظل المنافسة المحتدمة على مراكز الصدارة في الدوري المصري.

يأتي هذا في إطار خطة النادي الطموحة للمنافسة على الألقاب محلياً وقارياً، حيث يستعد الفريق أيضاً للمشاركة في دوري أبطال أفريقيا الموسم المقبل.

ولم تكشف المصادر عن هوية اللاعب بشكل رسمي، لكنها أشارت إلى أنه من أفضل المهاجمين في الدوري الفرنسي هذا الموسم، وأن المفاوضات وصلت لمراحل متقدمة.`,
        category: 'transfer',
        isBreaking: false,
        isFeatured: false,
        isPublished: true,
        status: 'published',
        authorId: editorUser.id,
        publishedAt: new Date(today.getTime() - 2 * 86400000),
        views: 8450,
        image: '/articles/pyramids-transfer.jpg',
      },
    }),

    prisma.article.create({
      data: {
        title: 'الاتحاد يخطط لصفقة مدوية بنزلة بنزيما الصيفية',
        slug: 'ittihad-summer-plans-benzema',
        summary: 'يسعى نادي الاتحاد السعودي لتدعيم صفوفه بصفقات قوية الصيف المقبل لدعم بنزيما في المنافسة على لقب الدوري.',
        content: `يخطط نادي الاتحاد السعودي لإجراء صفقات مدوية في فترة الانتقالات الصيفية القادمة، بهدف بناء فريق قادر على المنافسة بقوة على لقب دوري روشن في الموسم المقبل.

ويأتي ذلك في ظل الأداء المتميز الذي يقدمه كريم بنزيما هذا الموسم برصيد 17 هدفاً، لكن الفريق يحتاج إلى دعم إضافي في عدة مراكز خاصة خط الوسط والدفاع.

وأشارت تقارير إلى أن إدارة النادي حددت عدة أسماء بارزة في أوروبا للتفاوض معها، بما في ذلك لاعب وسط إسباني ومدافع فرنسي، إلى جانب الاهتمام بلاعبين من الدوري المصري والأفريقي.

كما يدرس النادي إمكانية التعاقد مع مدرب جديد يتناسب مع طموحات الفريق، خاصة بعد النتائج المتذبذبة في بعض مباريات الموسم الحالي.`,
        category: 'transfer',
        isBreaking: false,
        isFeatured: false,
        isPublished: true,
        status: 'published',
        authorId: editorUser.id,
        publishedAt: new Date(today.getTime() - 4 * 86400000),
        views: 12300,
        image: '/articles/ittihad-plans.jpg',
      },
    }),

    // General articles
    prisma.article.create({
      data: {
        title: 'مبابي يقود ريال مدريد للتعادل الدرامي مع برشلونة في الكلاسيكو',
        slug: 'mbappe-real-madrid-draw-barcelona-clasico',
        summary: 'سجل كيليان مبابي هدفاً مبكراً لكن برشلونة عادل عبر ليفاندوفسكي ويامال في اللحظات الأخيرة، لتنتهي المباراة بتعادل مثير 2-2.',
        content: `أقيم الكلاسيكو الإسباني بين ريال مدريد وبرشلونة على ملعب سانتياغو برنابيو، وانتهى بتعادل مثير بهدفين لمثلهما في لقاء شهد إثارة من الدقيقة الأولى حتى الأخيرة.

افتتح كيليان مبابي التسجيل في الدقيقة 8 بعد هجمة مرتدة سريعة، حيث استلم الكرة على الطرف الأيسر وانطلق بسرعة فائقة قبل أن يسدد بقوة في الزاوية البعيدة. كان الهدف بمثابة رسالة من النجم الفرنسي بأنه جاهز للمباريات الكبيرة.

عادل روبرت ليفاندوفسكي النتيجة في الدقيقة 22 برأسية قوية من ركلة ركنية، قبل أن يضيف فينيسيوس جونيور الهدف الثاني لريال مدريد في الدقيقة 56 بعد تمريرة بينية رائعة من جود بيلينغهام.

وفي الدقائق الأخيرة، وبينما كان ريال مدريد يعتقد أنه حسم المباراة، ظهر لامين يامال البالغ من العمر 18 عاماً ليسجل هدف التعادل في الدقيقة 88 بتسديدة صاروخية من خارج منطقة الجزاء، لينقذ برشلونة من هزيمة مؤكدة ويثبت أنه نجم المستقبل.`,
        category: 'general',
        isBreaking: false,
        isFeatured: false,
        isPublished: true,
        status: 'published',
        authorId: adminUser.id,
        publishedAt: new Date(today.getTime() - 3 * 86400000),
        views: 41200,
        image: '/articles/clasico-draw.jpg',
      },
    }),

    prisma.article.create({
      data: {
        title: 'أرسنال يسحق تشيلسي بثلاثية نظيفة في ديربي لندن',
        slug: 'arsenal-crush-chelsea-london-derby',
        summary: 'حقق أرسنال فوزاً عريضاً على تشيلسي 3-1 في ديربي لندن، بتألق واضح من بوكايو ساكا الذي سجل هدفين وصنع ثالثاً.',
        content: `حقق نادي أرسنال فوزاً مستحقاً على جاره تشيلسي بنتيجة 3-1 في ديربي لندن الذي أقيم على ملعب الإمارات ضمن الجولة 29 من الدوري الإنجليزي.

سجل بوكايو ساكا هدفين رائعين وصنع هدفاً، ليكون نجم المباراة بلا منازع. افتتح التسجيل في الدقيقة 11 بعد مراوغة رائعة على الجهة اليمنى، ثم أضاف مارتن أوديغارد الهدف الثاني في الدقيقة 34.

قلص كول بالمر الفارق لتشيلسي في الدقيقة 50 بتسديدة من خارج منطقة الجزاء، لكن ساكا عاد ليسجل الهدف الثالث لأرسنال في الدقيقة 77 لينهي أي آمال تشيلسي في العودة للمباراة.

بهذا الفوز، يعزز أرسنال موقعه في المركز الثاني برصيد 65 نقطة، ويبقى على بعد 5 نقاط من ليفربول المتصدر.`,
        category: 'general',
        isBreaking: false,
        isFeatured: false,
        isPublished: true,
        status: 'published',
        authorId: editorUser.id,
        publishedAt: new Date(today.getTime() - 1 * 86400000),
        views: 22100,
        image: '/articles/arsenal-chelsea.jpg',
      },
    }),

    prisma.article.create({
      data: {
        title: 'دوري أبطال أفريقيا: الأهلي والزمالك يتأهلان لنصف النهائي',
        slug: 'caf-champions-ahly-zamalek-semifinals',
        summary: 'تأهل نائبا القاهرة الأهلي والزمالك إلى دور نصف النهائي من دوري أبطال أفريقيا، في إنجاز غير مسبوق للكرة المصرية القارية.',
        content: `حقق ناديا الأهلي والزمالك المصريان تأهلاً تاريخياً إلى دور نصف النهائي من دوري أبطال أفريقيا، بعد نتائج إيجابية حققاها في دور ربع النهائي.

وتأهل الأهلي بعد فوزه ذهاباً وإياباً بنتائج مقنعة، حيث قدم عروضاً قوية تعكس خبرته القارية الواسعة كأكثر الأندية تتويجاً باللقب. وتألق محمد الشناوي في حراسة المرمى ومحمد شريف في خط الهجوم.

أما الزمالك فقد تأهل بصعوبة بعد تعادل ذهاب وخ فوز إياب مثير، حيث أظهر الفريق شخصية قوية وعزيمة لا تلين أمام المنافسين الأفارقة.

ومن المنتظر أن يلتقي الأهلي والزمالك في نصف النهائي في ديربي قاري سيكون الأول من نوعه في تاريخ البطولة على هذه المرحلة، مما يضفي إثارة إضافية على المنافسة القارية.`,
        category: 'general',
        isBreaking: false,
        isFeatured: false,
        isPublished: true,
        status: 'published',
        authorId: adminUser.id,
        publishedAt: new Date(today.getTime() - 1 * 86400000),
        views: 15800,
        image: '/articles/caf-champions.jpg',
      },
    }),

    // Draft articles
    prisma.article.create({
      data: {
        title: 'الهلال يواصل تصدر الدوري السعودي بعد جولة مثيرة',
        slug: 'hilal-top-saudi-league',
        summary: 'يواصل نادي الهلال تصدره لجدول ترتيب الدوري السعودي للمحترفين بعد نهاية الجولة 24 بفارق كبير عن أقرب ملاحقيه.',
        content: `يستمر نادي الهلال في تصدر جدول ترتيب دوري روشن السعودي برصيد 60 نقطة بعد نهاية الجولة 24، بفارق 8 نقاط عن النصر الوصيف.

ويدين الهلال بصدارته إلى الأداء الجماعي المتميز والعروض القوية التي يقدمها في كل المباريات، حيث يمتلك أقوى هجوم وأقوى دفاع في الدوري برصيد 58 هدفاً مسجلاً و18 هدفاً مستقبلاً.

وتألق سالم الدوسري بشكل خاص هذا الموسم برصيد 12 هدفاً و9 تمريرات حاسمة، فيما عاد نيمار لتعزيز قوة الفريق الهجومية بعد غياب طويل بسبب الإصابة.

ويتبقى للهلال 10 جولات لختم لقبه الثاني على التوالي، ويبدو أن الأمور تسير لصالحه بقوة.`,
        category: 'general',
        isBreaking: false,
        isFeatured: false,
        isPublished: true,
        status: 'published',
        authorId: editorUser.id,
        publishedAt: new Date(today.getTime() - 5 * 86400000),
        views: 9200,
        image: '/articles/hilal-top.jpg',
      },
    }),

    prisma.article.create({
      data: {
        title: 'تحليل: تأثير اللاعبين الأفارقة على الدوريات العربية',
        slug: 'analysis-african-players-arab-leagues',
        summary: 'تحليل معمق لدور اللاعبين الأفارقة في رفع مستوى الدوريات العربية وتأثيرهم على تطور كرة القدم في المنطقة.',
        content: `شهدت الدوريات العربية في السنوات الأخيرة تدفقاً ملحوظاً للاعبين أفارقة من مختلف الجنسيات، مما أثر بشكل واضح على مستوى المنافسة والجودة الفنية في هذه البطولات.

في الدوري المصري، يشكل اللاعبون النيجيريون والغانيون والسينغاليون نسبة كبيرة من المحترفين الأجانب، ويقدمون إضافات مهمة من حيث السرعة والقوة البدنية والمهارة الفردية.

أما في الدوري السعودي، فقد برزت أسماء أفريقية لامعة مثل ساديو ماني مع النصر، الذي قدم مستويات رفيعة وأصبح من أهم لاعبي الفريق.

ويمتلك اللاعبون الأفارقة ميزة التأقلم السريع مع الأجواء العربية نظراً للتقارب الثقافي والمناخي، مما يجعلهم خياراً مفضلاً للأندية العربية التي تبحث عن تأثير فوري دون الحاجة لفترة تأقلم طويلة.

لكن التحدي يبقى في كيفية الاستفادة من هؤلاء اللاعبين لتطوير اللاعبين المحليين، بدلاً من الاعتماد الكلي عليهم في حسم المباريات.`,
        category: 'analysis',
        isBreaking: false,
        isFeatured: false,
        isPublished: true,
        status: 'published',
        authorId: adminUser.id,
        publishedAt: new Date(today.getTime() - 7 * 86400000),
        views: 6700,
        image: '/articles/african-players.jpg',
      },
    }),

    prisma.article.create({
      data: {
        title: 'إصابة قوية تبعد نجم الهلال عن الملاعب 6 أسابيع',
        slug: 'hilal-star-injury-6-weeks',
        summary: 'أكدت الفحوصات الطبية إصابة لاعب وسط الهلال بإصابة في العضلة الضامة ستبعده عن الملاعب لمدة 6 أسابيع.',
        content: `أصدر الجهاز الطبي بنادي الهلال بياناً رسمياً أكد فيه إصابة أحد لاعبي الوسط الأساسيين بإصابة في العضلة الضامة، ستبعده عن الملاعب لفترة تتراوح بين 5 إلى 6 أسابيع.

وتأتي هذه الإصابة في وقت حرج من الموسم، حيث يمر الفريق بمرحلة حاسمة في الدوري السعودي ودوري أبطال آسيا.

وأشار البيان إلى أن اللاعب سيخضع لبرنامج تأهيلي مكثف تحت إشراف الجهاز الطبي، مع إمكانية عودته قبل الموعد المتوقع إذا استجاب للعلاج بشكل إيجابي.

من جانبه، أكد مدرب الهلال أن الفريق يمتلك بدائل جيدة قادرة على سد الفراغ الذي سيتركه اللاعب المصاب، وأن التركيز سيكون على المباريات المقبلة بروح عالية.`,
        category: 'general',
        isBreaking: false,
        isFeatured: false,
        isPublished: true,
        status: 'published',
        authorId: editorUser.id,
        publishedAt: new Date(today.getTime() - 3 * 86400000),
        views: 11200,
        image: '/articles/hilal-injury.jpg',
      },
    }),

    // Draft article (not published)
    prisma.article.create({
      data: {
        title: 'مراجعة: أفضل 10 أهداف في الدوريات العربية هذا الموسم',
        slug: 'review-top-10-goals-arab-leagues',
        summary: 'مراجعة شاملة لأجمل 10 أهداف سُجلت في الدوريات العربية خلال الموسم الحالي، من مصر والسعودية وغيرها.',
        content: `يقدم لكم هذا التقرير مراجعة شاملة لأجمل الأهداف التي سُجلت في الدوريات العربية خلال الموسم الحالي، والتي تضمنت تسديدات صاروخية ومراوغات ساحرة ورأسيات خيالية.

تصدر القائمة هدف سالم الدوساري في مرمى النصر من تسديدة مقصية من خارج منطقة الجزاء، يليه هدف محمد شريف في مرمى الزمالك بعد مراوغة ثلاثة مدافعين.

كما ضمت القائمة أهدافاً من دوري أبطال أفريقيا والدوري المغربي والتونسي، مما يعكس المستوى الفني المتصاعد في كرة القدم العربية.

سنستعرض في هذا التقرير كل هدف بالتفصيل مع تحليل فني لطريقة التسجيل والظروف المحيطة به، مع مقاطع فيديو توضيحية.`,
        category: 'report',
        isBreaking: false,
        isFeatured: false,
        isPublished: false,
        status: 'draft',
        authorId: adminUser.id,
        views: 0,
        image: '/articles/top-goals.jpg',
      },
    }),

    // Another draft
    prisma.article.create({
      data: {
        title: 'تشكيلة الموسم: أفضل 11 لاعباً في الدوريات العربية 2025-2026',
        slug: 'team-season-best-11-arab-leagues',
        summary: 'تشكيلة مثالية تضم أفضل 11 لاعباً في الدوريات العربية لهذا الموسم بناءً على الأداء والإحصائيات.',
        content: `نقدم لكم تشكيلة الموسم المثالية لأفضل 11 لاعباً في الدوريات العربية بناءً على أدائهم خلال الموسم الحالي 2025-2026.

في حراسة المرمى: محمد الشناوي (الأهلي) - قدم موسماً استثنائياً وحافظ على شباكه نظيفة في 14 مباراة.

في خط الدفاع: أحمد فتوح (الزمالك) يشكل الجبهة اليسرى بقوة، مع وجود عناصر دفاعية قوية من الدوري السعودي والمصري.

في خط الوسط: سالم الدوسري (الهلال) وعبدالله السعيد (بيراميدز) يتصدران خط الوسط بأرقام مميزة هذا الموسم.

في خط الهجوم: كريستيانو رونالدو (النصر) وكريم بنزيما (الاتحاد) ومحمد شريف (الأهلي) يشكلون مثلث هجوم مرعب.

التشكيلة تعكس التنوع بين الدوريات المختلفة وتبرز المستوى المتميز الذي وصلت إليه الكرة العربية هذا الموسم.`,
        category: 'analysis',
        isBreaking: false,
        isFeatured: false,
        isPublished: false,
        status: 'draft',
        authorId: editorUser.id,
        views: 0,
        image: '/articles/team-season.jpg',
      },
    }),
  ])

  console.log(`✅ تم إنشاء ${articles.length} مقال`)

  // ===== وسوم المقالات وربطها بالفرق =====
  console.log('🏷️ إنشاء وسوم المقالات وربطها بالفرق...')

  const articleTags = await Promise.all([
    // Article 1 - Salah/Liverpool
    prisma.articleTag.create({ data: { articleId: articles[0].id, tag: 'محمد صلاح' } }),
    prisma.articleTag.create({ data: { articleId: articles[0].id, tag: 'ليفربول' } }),
    prisma.articleTag.create({ data: { articleId: articles[0].id, tag: 'الدوري الإنجليزي' } }),
    prisma.articleTag.create({ data: { articleId: articles[0].id, tag: 'مانشستر سيتي' } }),
    // Article 2 - Ronaldo/Nassr
    prisma.articleTag.create({ data: { articleId: articles[1].id, tag: 'كريستيانو رونالدو' } }),
    prisma.articleTag.create({ data: { articleId: articles[1].id, tag: 'النصر' } }),
    prisma.articleTag.create({ data: { articleId: articles[1].id, tag: 'انتقالات' } }),
    // Article 3 - Ahly/Zamalek Derby
    prisma.articleTag.create({ data: { articleId: articles[2].id, tag: 'ديربي القاهرة' } }),
    prisma.articleTag.create({ data: { articleId: articles[2].id, tag: 'الأهلي' } }),
    prisma.articleTag.create({ data: { articleId: articles[2].id, tag: 'الزمالك' } }),
    prisma.articleTag.create({ data: { articleId: articles[2].id, tag: 'الدوري المصري' } }),
    // Article 4 - Neymar/Hilal
    prisma.articleTag.create({ data: { articleId: articles[3].id, tag: 'نيمار' } }),
    prisma.articleTag.create({ data: { articleId: articles[3].id, tag: 'الهلال' } }),
    prisma.articleTag.create({ data: { articleId: articles[3].id, tag: 'إصابات' } }),
    // Article 5 - Liverpool UCL
    prisma.articleTag.create({ data: { articleId: articles[4].id, tag: 'ليفربول' } }),
    prisma.articleTag.create({ data: { articleId: articles[4].id, tag: 'دوري الأبطال' } }),
    prisma.articleTag.create({ data: { articleId: articles[4].id, tag: 'محمد صلاح' } }),
    // Article 6 - Saudi League Report
    prisma.articleTag.create({ data: { articleId: articles[5].id, tag: 'الدوري السعودي' } }),
    prisma.articleTag.create({ data: { articleId: articles[5].id, tag: 'انتقالات' } }),
    prisma.articleTag.create({ data: { articleId: articles[5].id, tag: 'نجوم عالميون' } }),
    // Article 7 - Pyramids transfer
    prisma.articleTag.create({ data: { articleId: articles[6].id, tag: 'بيراميدز' } }),
    prisma.articleTag.create({ data: { articleId: articles[6].id, tag: 'انتقالات' } }),
    // Article 8 - Ittihad plans
    prisma.articleTag.create({ data: { articleId: articles[7].id, tag: 'الاتحاد' } }),
    prisma.articleTag.create({ data: { articleId: articles[7].id, tag: 'كريم بنزيما' } }),
    // Article 9 - Clasico
    prisma.articleTag.create({ data: { articleId: articles[8].id, tag: 'الكلاسيكو' } }),
    prisma.articleTag.create({ data: { articleId: articles[8].id, tag: 'ريال مدريد' } }),
    prisma.articleTag.create({ data: { articleId: articles[8].id, tag: 'برشلونة' } }),
    // Article 10 - Arsenal/Chelsea
    prisma.articleTag.create({ data: { articleId: articles[9].id, tag: 'أرسنال' } }),
    prisma.articleTag.create({ data: { articleId: articles[9].id, tag: 'تشيلسي' } }),
    prisma.articleTag.create({ data: { articleId: articles[9].id, tag: 'ديربي لندن' } }),
    // Article 11 - CAF
    prisma.articleTag.create({ data: { articleId: articles[10].id, tag: 'دوري أبطال أفريقيا' } }),
    prisma.articleTag.create({ data: { articleId: articles[10].id, tag: 'الأهلي' } }),
    prisma.articleTag.create({ data: { articleId: articles[10].id, tag: 'الزمالك' } }),
    // Article 12 - Hilal top
    prisma.articleTag.create({ data: { articleId: articles[11].id, tag: 'الهلال' } }),
    prisma.articleTag.create({ data: { articleId: articles[11].id, tag: 'الدوري السعودي' } }),
    // Article 13 - African players
    prisma.articleTag.create({ data: { articleId: articles[12].id, tag: 'لاعبون أفارقة' } }),
    prisma.articleTag.create({ data: { articleId: articles[12].id, tag: 'الدوريات العربية' } }),
    // Article 14 - Hilal injury
    prisma.articleTag.create({ data: { articleId: articles[13].id, tag: 'الهلال' } }),
    prisma.articleTag.create({ data: { articleId: articles[13].id, tag: 'إصابات' } }),
  ])

  const articleTeams = await Promise.all([
    prisma.articleTeam.create({ data: { articleId: articles[0].id, teamId: liverpool.id } }),
    prisma.articleTeam.create({ data: { articleId: articles[0].id, teamId: manCity.id } }),
    prisma.articleTeam.create({ data: { articleId: articles[1].id, teamId: nassr.id } }),
    prisma.articleTeam.create({ data: { articleId: articles[2].id, teamId: ahly.id } }),
    prisma.articleTeam.create({ data: { articleId: articles[2].id, teamId: zamalek.id } }),
    prisma.articleTeam.create({ data: { articleId: articles[3].id, teamId: hilal.id } }),
    prisma.articleTeam.create({ data: { articleId: articles[3].id, teamId: nassr.id } }),
    prisma.articleTeam.create({ data: { articleId: articles[4].id, teamId: liverpool.id } }),
    prisma.articleTeam.create({ data: { articleId: articles[5].id, teamId: hilal.id } }),
    prisma.articleTeam.create({ data: { articleId: articles[5].id, teamId: nassr.id } }),
    prisma.articleTeam.create({ data: { articleId: articles[5].id, teamId: ittihad.id } }),
    prisma.articleTeam.create({ data: { articleId: articles[6].id, teamId: pyramids.id } }),
    prisma.articleTeam.create({ data: { articleId: articles[7].id, teamId: ittihad.id } }),
    prisma.articleTeam.create({ data: { articleId: articles[8].id, teamId: realMadrid.id } }),
    prisma.articleTeam.create({ data: { articleId: articles[8].id, teamId: barcelona.id } }),
    prisma.articleTeam.create({ data: { articleId: articles[9].id, teamId: arsenal.id } }),
    prisma.articleTeam.create({ data: { articleId: articles[9].id, teamId: chelsea.id } }),
    prisma.articleTeam.create({ data: { articleId: articles[10].id, teamId: ahly.id } }),
    prisma.articleTeam.create({ data: { articleId: articles[10].id, teamId: zamalek.id } }),
    prisma.articleTeam.create({ data: { articleId: articles[11].id, teamId: hilal.id } }),
    prisma.articleTeam.create({ data: { articleId: articles[13].id, teamId: hilal.id } }),
  ])

  console.log(`✅ تم إنشاء ${articleTags.length} وسم و ${articleTeams.length} رابط مقال-فريق`)

  // ===== الإعلانات =====
  console.log('📢 إنشاء الإعلانات...')

  const adSlots = await Promise.all([
    prisma.adSlot.create({
      data: {
        position: 'header',
        title: 'إعلان البانر العلوي',
        content: '<div class="ad-banner"><a href="https://example.com/sponsor"><img src="/ads/header-banner.jpg" alt="راعي الموقع"/></a></div>',
        imageUrl: '/ads/header-banner.jpg',
        linkUrl: 'https://example.com/sponsor',
        isActive: true,
        startDate: new Date(today.getTime() - 30 * 86400000),
        endDate: new Date(today.getTime() + 30 * 86400000),
        impressions: 125000,
        clicks: 3200,
      },
    }),
    prisma.adSlot.create({
      data: {
        position: 'sidebar',
        title: 'إعلان الشريط الجانبي',
        content: '<div class="ad-sidebar"><a href="https://example.com/betting"><img src="/ads/sidebar-ad.jpg" alt="إعلان"/></a></div>',
        imageUrl: '/ads/sidebar-ad.jpg',
        linkUrl: 'https://example.com/betting',
        isActive: true,
        startDate: new Date(today.getTime() - 15 * 86400000),
        endDate: new Date(today.getTime() + 15 * 86400000),
        impressions: 89000,
        clicks: 2100,
      },
    }),
    prisma.adSlot.create({
      data: {
        position: 'article_top',
        title: 'إعلان أعلى المقال',
        content: '<div class="ad-article-top">محتوى إعلاني - عرض خاص من شريكنا</div>',
        imageUrl: '/ads/article-top.jpg',
        linkUrl: 'https://example.com/offer',
        isActive: true,
        startDate: new Date(today.getTime() - 7 * 86400000),
        endDate: new Date(today.getTime() + 7 * 86400000),
        impressions: 45000,
        clicks: 980,
      },
    }),
    prisma.adSlot.create({
      data: {
        position: 'match_page',
        title: 'إعلان صفحة المباراة',
        content: '<div class="ad-match">البث المباشر متاح على قنوات شريكنا الرسمي</div>',
        imageUrl: '/ads/match-page.jpg',
        linkUrl: 'https://example.com/streaming',
        isActive: true,
        impressions: 67000,
        clicks: 4500,
      },
    }),
  ])

  console.log(`✅ تم إنشاء ${adSlots.length} موضع إعلاني`)

  // ===== إعدادات الموقع =====
  console.log('⚙️ إنشاء إعدادات الموقع...')

  const siteSettings = await Promise.all([
    prisma.siteSetting.create({ data: { key: 'site_name', value: 'سبورت بلس' } }),
    prisma.siteSetting.create({ data: { key: 'site_name_en', value: 'SportPulse' } }),
    prisma.siteSetting.create({ data: { key: 'site_description', value: 'منصة سبورت بلس الإخبارية - أخبار الرياضة العربية والعالمية لحظة بلحظة' } }),
    prisma.siteSetting.create({ data: { key: 'site_url', value: 'https://sportpulse.com' } }),
    prisma.siteSetting.create({ data: { key: 'site_logo', value: '/logo.svg' } }),
    prisma.siteSetting.create({ data: { key: 'site_favicon', value: '/favicon.ico' } }),
    prisma.siteSetting.create({ data: { key: 'primary_color', value: '#C8102E' } }),
    prisma.siteSetting.create({ data: { key: 'secondary_color', value: '#1A1A2E' } }),
    prisma.siteSetting.create({ data: { key: 'default_language', value: 'ar' } }),
    prisma.siteSetting.create({ data: { key: 'social_twitter', value: 'https://twitter.com/sportpulse' } }),
    prisma.siteSetting.create({ data: { key: 'social_instagram', value: 'https://instagram.com/sportpulse' } }),
    prisma.siteSetting.create({ data: { key: 'social_youtube', value: 'https://youtube.com/sportpulse' } }),
    prisma.siteSetting.create({ data: { key: 'social_facebook', value: 'https://facebook.com/sportpulse' } }),
    prisma.siteSetting.create({ data: { key: 'contact_email', value: 'info@sportpulse.com' } }),
    prisma.siteSetting.create({ data: { key: 'contact_phone', value: '+202123456789' } }),
    prisma.siteSetting.create({ data: { key: 'breaking_news_interval', value: '30000' } }), // 30 seconds
    prisma.siteSetting.create({ data: { key: 'articles_per_page', value: '12' } }),
    prisma.siteSetting.create({ data: { key: 'enable_comments', value: 'true' } }),
    prisma.siteSetting.create({ data: { key: 'enable_predictions', value: 'true' } }),
    prisma.siteSetting.create({ data: { key: 'enable_live_scores', value: 'true' } }),
    prisma.siteSetting.create({ data: { key: 'maintenance_mode', value: 'false' } }),
  ])

  console.log(`✅ تم إنشاء ${siteSettings.length} إعداد موقع`)

  // ===== ملخص =====
  console.log('\n========================================')
  console.log('✅ تم زرع قاعدة البيانات بنجاح!')
  console.log('========================================')
  console.log(`👥 المستخدمون: 2`)
  console.log(`🏆 الدوريات: ${leagues.length}`)
  console.log(`⚽ الفرق: ${allTeams.length}`)
  console.log(`🔗 روابط الدوري-الفريق: ${leagueTeamLinks.length}`)
  console.log(`🏃 اللاعبون: ${players.length}`)
  console.log(`🏟️ المباريات: ${matches.length}`)
  console.log(`📝 أحداث المباريات: ${matchEvents.length}`)
  console.log(`📊 سجلات الترتيب: ${allStandings.length}`)
  console.log(`🎯 سجلات الهدافين: ${topScorers.length}`)
  console.log(`📰 المقالات: ${articles.length}`)
  console.log(`🏷️ وسوم المقالات: ${articleTags.length}`)
  console.log(`🔗 روابط المقال-الفريق: ${articleTeams.length}`)
  console.log(`📢 مواضع الإعلانات: ${adSlots.length}`)
  console.log(`⚙️ إعدادات الموقع: ${siteSettings.length}`)
  console.log('========================================')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ خطأ في زرع قاعدة البيانات:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
