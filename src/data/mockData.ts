export const weeks = ['15W', '16W', '17W', '18W'];

export const summaryData = {
  '15W': { revenue: 820000000, newCustomers: 312, conversionRate: 2.1, roas: 28000 },
  '16W': { revenue: 910000000, newCustomers: 341, conversionRate: 2.4, roas: 32000 },
  '17W': { revenue: 875000000, newCustomers: 298, conversionRate: 2.2, roas: 30000 },
  '18W': { revenue: 960000000, newCustomers: 378, conversionRate: 2.7, roas: 44000 },
};

export const prevMonthAvg = {
  revenue: 850000000,
  newCustomers: 320,
  conversionRate: 2.2,
  roas: 29000,
};

export const investmentStoreData = [
  { name: '투자형', value: 49.5 },
  { name: '일반', value: 50.5 },
];

export const funnelData = {
  '15W': [
    { stage: '목록 조회', users: 50000, exitRate: 0 },
    { stage: '상세 진입', users: 28000, exitRate: 44 },
    { stage: '옵션 선택', users: 12000, exitRate: 57 },
    { stage: '장바구니 담기', users: 1300, exitRate: 89 },
    { stage: '결제 진입', users: 780, exitRate: 40 },
    { stage: '구매 완료', users: 620, exitRate: 21 },
  ],
  '16W': [
    { stage: '목록 조회', users: 54000, exitRate: 0 },
    { stage: '상세 진입', users: 31000, exitRate: 43 },
    { stage: '옵션 선택', users: 13500, exitRate: 56 },
    { stage: '장바구니 담기', users: 1500, exitRate: 89 },
    { stage: '결제 진입', users: 910, exitRate: 39 },
    { stage: '구매 완료', users: 730, exitRate: 20 },
  ],
  '17W': [
    { stage: '목록 조회', users: 51000, exitRate: 0 },
    { stage: '상세 진입', users: 29000, exitRate: 43 },
    { stage: '옵션 선택', users: 12500, exitRate: 57 },
    { stage: '장바구니 담기', users: 1400, exitRate: 89 },
    { stage: '결제 진입', users: 840, exitRate: 40 },
    { stage: '구매 완료', users: 670, exitRate: 20 },
  ],
  '18W': [
    { stage: '목록 조회', users: 58000, exitRate: 0 },
    { stage: '상세 진입', users: 34000, exitRate: 41 },
    { stage: '옵션 선택', users: 15000, exitRate: 56 },
    { stage: '장바구니 담기', users: 1700, exitRate: 89 },
    { stage: '결제 진입', users: 1050, exitRate: 38 },
    { stage: '구매 완료', users: 850, exitRate: 19 },
  ],
};

export const funnelTrendData = weeks.map((w) => ({
  week: w,
  '목록→상세': funnelData[w as keyof typeof funnelData][1].exitRate,
  '상세→옵션': funnelData[w as keyof typeof funnelData][2].exitRate,
  '옵션→담기': funnelData[w as keyof typeof funnelData][3].exitRate,
  '담기→결제': funnelData[w as keyof typeof funnelData][4].exitRate,
  '결제→완료': funnelData[w as keyof typeof funnelData][5].exitRate,
}));

export const seriesRevenueData = [
  { series: 'T50', '15W': 320, '16W': 350, '17W': 330, '18W': 380 },
  { series: 'T60 AIR', '15W': 280, '16W': 310, '17W': 295, '18W': 340 },
  { series: 'GX', '15W': 150, '16W': 170, '17W': 160, '18W': 180 },
  { series: '기타', '15W': 70, '16W': 80, '17W': 90, '18W': 60 },
];

export const channelData = weeks.map((w, i) => ({
  week: w,
  '자사몰': 35 + i * 2,
  '외부채널': 65 - i * 2,
}));

export const storeTypeData = [
  { type: '투자형', revenue: 495, target: 500 },
  { type: '직영', revenue: 280, target: 300 },
  { type: '대리점', revenue: 185, target: 200 },
];

export const crmData = weeks.map((w, i) => ({
  week: w,
  발송건수: 12000 + i * 800,
  기여매출: 180 + i * 25,
  ROAS: 27000 + i * 5000,
}));

export const roasData = weeks.map((w, i) => ({
  week: w,
  META: 25000 + i * 4000,
  SA: 30000 + i * 6000,
}));

export const asData = [
  { stage: '버튼 클릭', users: 5000 },
  { stage: '증상 입력', users: 2800, exitRate: 44 },
  { stage: '접수 완료', users: 1900, exitRate: 32 },
];

export const engineerData = weeks.map((w, i) => ({
  week: w,
  엔지니어: 78 + i * 1.5,
  유선: 22 - i * 1.5,
}));

export const loyaltyData = {
  newCustomers: 378,
  registeredProducts: 245,
  returningOrders: 1230,
  referralCouponRate: 8.4,
};

export const issues = [
  { id: 1, week: '18W', category: '매출', content: 'T60 AIR 수주 급증 — 재고 확인 필요', assignee: '김운영', status: '진행중' },
  { id: 2, week: '18W', category: '서비스', content: '노원 매장 매출 전주 대비 15% 감소', assignee: '이매니저', status: '진행중' },
  { id: 3, week: '17W', category: '기타', content: 'B2B 제안서 작성 — 기업 고객 대상 단체 구매 프로모션', assignee: '박기획', status: '완료' },
  { id: 4, week: '17W', category: '마케팅', content: '롯데메종동부산 퇴점 협의 데이터 정리', assignee: '최마케터', status: '진행중' },
];
