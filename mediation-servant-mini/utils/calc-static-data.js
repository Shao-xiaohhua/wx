module.exports = {
    caseTypeArr: [
        {
            title: "财产案件",
            childs: [{ title: '财产案件', value: '1', active: true }],
            value: '1'
        },
        {
            title: "非财产案件",
            childs: [
                { title: '非财产案件', value: '2', active: false },
                { title: '离婚案件', value: '2', active: false },
                { title: '侵害人格权案件', value: '3', active: false },
                { title: '其他非财产案件', value: '4', active: false }
            ],
            value: '2'
        },
        {
            title: "知识产权民事案件",
            childs: [{ title: '知识产权民事案件', value: '5', active: false }],
            value: '5'
        },
        {
            title: "劳动争议案件",
            childs: [{ title: '劳动争议案件', value: '6', active: false }],
            value: '6'
        },
        {
            title: "行政案件",
            childs: [
                { title: '行政案件', value: '7', active: false },
                { title: '商标专利海事行政案件', value: '7', active: false },
                { title: '其他行政案件', value: '8', active: false }
            ],
            value: '7'
        },
        {
            title: "管辖权异议",
            childs: [{ title: '管辖权异议', value: '9', active: false }],
            value: '9'
        },
        {
            title: "申请执行",
            childs: [
                { title: '申请执行', value: '101', active: false },
                { title: '无执行金额或价额', value: '101', active: false },
                { title: '有执行金额或价额', value: '102', active: false },
                { title: '符合民诉法五十五条第四款规定', value: '103', active: false }
            ],
            value: '101'
        },
        {
            title: "申请财产保全",
            childs: [{ title: '申请财产保全', value: '104', active: false }],
            value: '104'
        },
        {
            title: "申请支付令",
            childs: [{ title: '申请支付令', value: '105', active: false }],
            value: '105'
        },
        {
            title: "申请公示催告",
            childs: [{ title: '申请公示催告', value: '106', active: false }],
            value: '106'
        },
        {
            title: "申请撤销仲裁裁决或认定仲裁协议效力",
            childs: [{ title: '申请撤销仲裁裁决或认定仲裁协议效力', value: '107', active: false }],
            value: '107'
        },
        {
            title: "申请破产案件",
            childs: [{ title: '申请破产案件', value: '108', active: false }],
            value: '108'
        },
        {
            title: "海事案件",
            childs: [
                { title: '海事案件', value: '109', active: false },
                { title: '申请设立海事赔偿责任限制基金', value: '109', active: false },
                { title: '申请海事强制令', value: '110', active: false },
                { title: '申请船舶优先权催告', value: '111', active: false },
                { title: '申请海事债权登记', value: '112', active: false },
                { title: '申请共同海损理算', value: '113', active: false }
            ],
            value: '109'
        },
    ],
    court: [
        {
            title: "法院地区",
            childs: [
                { title: '全国通用', value: '0', active: true },
                { title: '上海', value: '1', active: false },
                { title: '北京', value: '2', active: false },
                { title: '天津', value: '3', active: false },
                { title: '广东', value: '4', active: false }
            ],
            value: '0'
        }
    ],
    hlbz: [
      {
        title: '护理标准',
        childs: [
          { title: '没有护理', value: '0', active: true },
          { title: '完全护理', value: '1', active: false },
          { title: '大部分护理', value: '2', active: false },
          { title: '部分护理', value: '3', active: false }
        ]
      }
    ],
    scdj: [
      {
        title: '伤残等级',
        childs: [
          { title: '没有伤残', value: '0', active: true },
          { title: '一级伤残', value: '1', active: false },
          { title: '二级伤残', value: '2', active: false },
          { title: '三级伤残', value: '3', active: false },
          { title: '四级伤残', value: '4', active: false },
          { title: '五级伤残', value: '5', active: false },
          { title: '六级伤残', value: '6', active: false },
          { title: '七级伤残', value: '7', active: false },
          { title: '八级伤残', value: '8', active: false },
          { title: '九级伤残', value: '9', active: false },
          { title: '十级伤残', value: '10', active: false },
          { title: '因工死亡', value: '10', active: false }
        ]
      }
    ]
}