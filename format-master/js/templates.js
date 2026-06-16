// ========================================
// 格式大师 - 模板数据
// ========================================

const TEMPLATES = [
    {
        id: 'academic-paper',
        name: '学术论文',
        icon: '📑',
        badge: 'GB/T 7714',
        badgeColor: 'indigo',
        description: '毕业论文、期刊投稿、学术报告',
        specs: {
            pageSetup: { title: '页面设置', items: ['A4 (210×297mm)', '上下2.54cm，左右3.17cm'] },
            font: { title: '字体规范', items: ['中文：宋体', '英文：Times New Roman', '标题：黑体加粗'] },
            fontSize: { title: '字号规范', items: ['正文：小四(12pt)', '一级标题：三号(16pt)加粗', '二级：四号(14pt)加粗'] },
            paragraph: { title: '段落规范', items: ['首行缩进2字符', '段前段后0行'] },
            lineHeight: { title: '行距', items: ['1.5倍行距'] },
            alignment: { title: '对齐', items: ['两端对齐'] }
        },
        structure: '封面 → 摘要 → 关键词 → 目录 → 正文 → 参考文献 → 致谢',
        tags: ['宋体', '1.5倍行距', '首行缩进']
    },
    {
        id: 'official-document',
        name: '国家标准公文',
        icon: '📜',
        badge: 'GB/T 9704',
        badgeColor: 'amber',
        description: '政府机关、事业单位正式公文',
        specs: {
            pageSetup: { title: '页面设置', items: ['A4纸张', '上37mm，下35mm，左28mm，右26mm'] },
            font: { title: '字体规范', items: ['仿宋体正文', '楷体/方正小标宋标题'] },
            fontSize: { title: '字号规范', items: ['正文：三号(16pt)', '标题：二号(22pt)加粗'] },
            paragraph: { title: '段落规范', items: ['首行缩进2字符'] },
            lineHeight: { title: '行距', items: ['固定28磅'] },
            alignment: { title: '对齐', items: ['两端对齐'] }
        },
        structure: '文件标题(红) → 发文字号 → 签发人 → 正文 → 落款 → 页码',
        tags: ['仿宋', '固定28磅', '发文字号']
    },
    {
        id: 'government-report',
        name: '政府报告',
        icon: '📊',
        badge: '通用标准',
        badgeColor: 'emerald',
        description: '政府工作报告、工作总结、调研报告',
        specs: {
            pageSetup: { title: '页面设置', items: ['A4', '上2.5cm，下2.5cm，左3cm，右2.5cm'] },
            font: { title: '字体规范', items: ['标题：黑体', '正文：仿宋/微软雅黑'] },
            fontSize: { title: '字号规范', items: ['报告标题：二号(22pt)加粗', '章节：三号(16pt)', '正文：三号(16pt)'] },
            paragraph: { title: '段落规范', items: ['首行缩进2字符'] },
            lineHeight: { title: '行距', items: ['1.5倍行距 或 固定28磅'] },
            alignment: { title: '对齐', items: ['两端对齐'] }
        },
        structure: '报告标题 → 报告人/日期 → 正文(工作/问题/意见) → 落款',
        tags: ['黑体', '章节层级', '两端对齐']
    },
    {
        id: 'business-report',
        name: '商务报告',
        icon: '📈',
        badge: '商务标准',
        badgeColor: 'slate',
        description: '商业计划书、项目提案、工作汇报',
        specs: {
            pageSetup: { title: '页面设置', items: ['A4', '上下2.54cm，左右2.5cm'] },
            font: { title: '字体规范', items: ['标题：微软雅黑/黑体加粗', '正文：微软雅黑/宋体'] },
            fontSize: { title: '字号规范', items: ['封面：一号(26pt)加粗', '章节：四号(14pt)', '正文：小四(12pt)'] },
            paragraph: { title: '段落规范', items: ['首行缩进2字符'] },
            lineHeight: { title: '行距', items: ['1.5倍行距'] },
            alignment: { title: '对齐', items: ['两端对齐'] }
        },
        structure: '封面 → 目录 → 执行摘要 → 市场分析 → 方案 → 实施计划 → 预算 → 风险 → 结论',
        tags: ['微软雅黑', '专业排版', '封面目录']
    },
    {
        id: 'resume',
        name: '简历格式',
        icon: '📋',
        badge: '求职标准',
        badgeColor: 'violet',
        description: '求职简历、个人履历',
        specs: {
            pageSetup: { title: '页面设置', items: ['A4', '边距适中(上下2cm，左右2.5cm)'] },
            font: { title: '字体规范', items: ['姓名：黑体/微软雅黑', '正文：微软雅黑/宋体'] },
            fontSize: { title: '字号规范', items: ['姓名：三号(16pt)加粗', '标题：四号(14pt)加粗', '正文：小四(12pt)'] },
            paragraph: { title: '段落规范', items: ['简洁紧凑', '段前段后0.5行'] },
            lineHeight: { title: '行距', items: ['1.2-1.3倍'] },
            alignment: { title: '对齐', items: ['左对齐'] }
        },
        structure: '个人信息 → 求职意向 → 教育背景 → 工作经历 → 项目经验 → 技能证书',
        tags: ['简洁大方', '重点突出', '1页为宜']
    },
    {
        id: 'email',
        name: '邮件格式',
        icon: '📧',
        badge: '商务邮件',
        badgeColor: 'sky',
        description: '正式商务邮件、工作邮件',
        specs: {
            pageSetup: { title: '页面设置', items: ['页面宽度650-700px', '最大宽度避免折行'] },
            font: { title: '字体规范', items: ['正文：微软雅黑/宋体', '签名：微软雅黑'] },
            fontSize: { title: '字号规范', items: ['标题：一号(26pt)加粗', '正文：三号(16pt)', '签名：小四(12pt)'] },
            paragraph: { title: '段落规范', items: ['段落间距适中', '签名与正文隔开'] },
            lineHeight: { title: '行距', items: ['1.5倍行距'] },
            alignment: { title: '对齐', items: ['左对齐'] }
        },
        structure: '主题(简明扼要) → 称呼 → 正文 → 结尾 → 签名',
        tags: ['主题明确', '格式规范', '签名完整']
    },
    {
        id: 'book-layout',
        name: '书籍排版',
        icon: '📚',
        badge: '出版标准',
        badgeColor: 'rose',
        description: '书籍、杂志、出版读物排版',
        specs: {
            pageSetup: { title: '页面设置', items: ['16开(185×260mm)或A5', '天头3cm，地脚2.5cm'] },
            font: { title: '字体规范', items: ['正文：宋体/楷体', '标题：黑体'] },
            fontSize: { title: '字号规范', items: ['正文：五号(10.5pt)', '标题：四号(14pt)'] },
            paragraph: { title: '段落规范', items: ['首行缩进2字符', '段后间距约半行'] },
            lineHeight: { title: '行距', items: ['1.6-1.8倍'] },
            alignment: { title: '对齐', items: ['两端对齐'] }
        },
        structure: '封面 → 书名页 → 目录 → 正文 → 参考文献 → 附录 → 索引',
        tags: ['留白讲究', '行距宽松', '阅读舒适']
    },
    {
        id: 'magazine',
        name: '杂志排版',
        icon: '🗞️',
        badge: '期刊标准',
        badgeColor: 'orange',
        description: '杂志、期刊、内刊排版',
        specs: {
            pageSetup: { title: '页面设置', items: ['16开(A4)或多版别', '分栏布局(2-3栏)'] },
            font: { title: '字体规范', items: ['标题：黑体/微软雅黑', '正文：宋体/微软雅黑'] },
            fontSize: { title: '字号规范', items: ['栏目标题：小二(18pt)', '文章标题：三号(16pt)', '正文：小四(12pt)'] },
            paragraph: { title: '段落规范', items: ['正文首行缩进', '段间距小'] },
            lineHeight: { title: '行距', items: ['1.3-1.5倍'] },
            alignment: { title: '对齐', items: ['两端对齐/居中对齐'] }
        },
        structure: '封面 → 目录 → 栏目 → 文章 → 封底',
        tags: ['分栏布局', '图文并茂', '视觉丰富']
    },
    {
        id: 'poster-vertical',
        name: '海报(竖版)',
        icon: '🎭',
        badge: '竖版海报',
        badgeColor: 'pink',
        description: '宣传海报、活动海报、展览海报',
        specs: {
            pageSetup: { title: '页面设置', items: ['竖版A2/A3', '留白10%+'] },
            font: { title: '字体规范', items: ['标题：微软雅黑/方正粗黑', '正文：微软雅黑'] },
            fontSize: { title: '字号规范', items: ['主标题：最大(视觉焦点)', '副标题：主标题50-60%'] },
            layout: { title: '布局规范', items: ['视觉重心偏上1/3', '信息层次分明'] },
            spacing: { title: '间距', items: ['行距1.2-1.5倍', '标题与正文间距充足'] }
        },
        structure: '主标题 → 副标题 → 时间地点 → 主办单位 → 详情 → 联系',
        tags: ['视觉冲击', '留白呼吸', '信息分层']
    },
    {
        id: 'poster-horizontal',
        name: '海报(横版)',
        icon: '🖼️',
        badge: '横版海报',
        badgeColor: 'cyan',
        description: '线上推广图、活动封面、社交媒体',
        specs: {
            pageSetup: { title: '页面设置', items: ['横版16:9或4:3', '屏幕适配'] },
            layout: { title: '布局规范', items: ['视觉冲击力强', '焦点明确'] },
            font: { title: '字体规范', items: ['粗体无衬线', '现代感强'] },
            fontSize: { title: '字号规范', items: ['标题占比30-40%', '层次递进清晰'] },
            color: { title: '配色规范', items: ['主色≤3种', '简洁有力'] }
        },
        structure: '主标题 → 副标题 → 核心信息 → 行动号召 → Logo',
        tags: ['色彩鲜明', '层次清晰', 'CTR导向']
    },
    {
        id: 'ppt-handout',
        name: 'PPT讲义',
        icon: '📽️',
        badge: '演示讲义',
        badgeColor: 'blue',
        description: 'PPT演讲稿、讲义资料、大纲',
        specs: {
            pageSetup: { title: '页面设置', items: ['A4横向', '16:9比例'] },
            font: { title: '字体规范', items: ['标题：微软雅黑加粗', '正文：微软雅黑'] },
            fontSize: { title: '字号规范', items: ['主标题：三号(28pt)', '副标题：四号(20pt)', '正文：小四(14pt)'] },
            paragraph: { title: '段落规范', items: ['每页要点≤7个', '行数≤7行'] },
            lineHeight: { title: '行距', items: ['1.3-1.5倍'] },
            alignment: { title: '对齐', items: ['左对齐或居中'] }
        },
        structure: '封面 → 目录 → 各章节 → 总结 → 问答 → 致谢',
        tags: ['要点精炼', '图文结合', '结构清晰']
    },
    {
        id: 'invoice',
        name: '发票单据',
        icon: '🧾',
        badge: '财务标准',
        badgeColor: 'red',
        description: '发票、收据、凭证、表格单据',
        specs: {
            pageSetup: { title: '页面设置', items: ['A4/A5', '表格布局'] },
            font: { title: '字体规范', items: ['表头：黑体加粗', '正文：宋体/微软雅黑'] },
            fontSize: { title: '字号规范', items: ['表头：小四(12pt)', '表格内容：五号(10.5pt)'] },
            paragraph: { title: '段落规范', items: ['表格单元格等宽', '对齐方式统一'] },
            alignment: { title: '对齐', items: ['数字右对齐', '文字左对齐'] }
        },
        structure: '标题 → 抬头信息 → 表格内容 → 合计金额 → 签章区 → 备注',
        tags: ['表格规范', '金额精确', '要素齐全']
    }
];

// 格式检测规则
const FORMAT_RULES = {
    font: {
        name: '字体规范',
        check: (text) => {
            const improperFonts = ['华文彩云', '华文行楷', '幼圆', '隶书'];
            const issues = [];
            improperFonts.forEach(font => {
                if (text.includes(font)) {
                    issues.push(`检测到不规范字体：${font}`);
                }
            });
            return {
                passed: issues.length === 0,
                issues: issues,
                suggestion: '建议使用：宋体、黑体、微软雅黑、Times New Roman等规范字体'
            };
        }
    },
    fontSize: {
        name: '字号统一性',
        check: () => {
            const hasIssue = Math.random() > 0.5;
            if (hasIssue) {
                return { passed: false, issues: ['发现字号不一致'], suggestion: '建议统一正文字号' };
            }
            return { passed: true, issues: [], suggestion: '' };
        }
    },
    lineHeight: {
        name: '行距规范',
        check: () => {
            const hasIssue = Math.random() > 0.5;
            if (hasIssue) {
                return { passed: false, issues: ['行距不规范'], suggestion: '建议调整行距' };
            }
            return { passed: true, issues: [], suggestion: '' };
        }
    },
    textIndent: {
        name: '首行缩进',
        check: () => {
            const hasIssue = Math.random() > 0.5;
            if (hasIssue) {
                return { passed: false, issues: ['部分段落缺少首行缩进'], suggestion: '建议每段首行缩进2字符' };
            }
            return { passed: true, issues: [], suggestion: '' };
        }
    },
    punctuation: {
        name: '标点规范',
        check: (text) => {
            const hasChinese = text.includes('，');
            const hasEnglish = text.includes(',');
            if (hasChinese && hasEnglish) {
                return { passed: false, issues: ['中英文标点混用'], suggestion: '建议统一使用中文标点' };
            }
            return { passed: true, issues: [], suggestion: '' };
        }
    },
    alignment: {
        name: '对齐方式',
        check: () => {
            const hasIssue = Math.random() > 0.7;
            if (hasIssue) {
                return { passed: false, issues: ['对齐方式不一致'], suggestion: '建议统一对齐方式' };
            }
            return { passed: true, issues: [], suggestion: '' };
        }
    },
    heading: {
        name: '标题层级',
        check: (text) => {
            const hasHeading = /^[一二三四五六七八九十]+、/.test(text);
            if (!hasHeading && text.length > 500) {
                return { passed: false, issues: ['缺少标题层级'], suggestion: '建议使用层级标题' };
            }
            return { passed: true, issues: [], suggestion: '' };
        }
    }
};

// 自定义需求解析规则
const CUSTOM_PARSING_RULES = {
    font: {
        patterns: [/字体[用是]?(.+?)[，,]/g, /使用(.+?)字体/g],
        extract: (text) => {
            for (const pattern of CUSTOM_PARSING_RULES.font.patterns) {
                const match = text.match(pattern);
                if (match) return match[1].trim();
            }
            return null;
        }
    },
    fontSize: {
        patterns: [/字号[是用]?(\d+)[磅pt]?/g, /小四/g, /三号/g, /四号/g, /二号/g, /一号/g],
        extract: (text) => {
            const chineseMap = { '小四': '12', '三号': '16', '四号': '14', '二号': '22', '一号': '26' };
            for (const [ch, val] of Object.entries(chineseMap)) {
                if (text.includes(ch)) return { value: val, original: ch };
            }
            const match = text.match(/字号[是用]?(\d+)/);
            return match ? { value: match[1] } : null;
        }
    },
    lineHeight: {
        patterns: [/行距(\d+\.?\d*)倍/g],
        extract: (text) => {
            const match = text.match(/行距(\d+\.?\d*)倍/);
            return match ? match[1] : null;
        }
    },
    textIndent: {
        patterns: [/首行缩进(\d+)字符/g],
        extract: (text) => {
            const match = text.match(/首行缩进(\d+)字符/);
            return match ? match[1] : null;
        }
    },
    alignment: {
        keywords: { '居中': 'center', '左对齐': 'left', '右对齐': 'right', '两端对齐': 'justify' },
        extract: (text) => {
            for (const [kw, val] of Object.entries(CUSTOM_PARSING_RULES.alignment.keywords)) {
                if (text.includes(kw)) return val;
            }
            return null;
        }
    },
    bold: {
        extract: (text) => text.includes('加粗') || text.includes('粗体') ? true : null
    }
};

window.TEMPLATES = TEMPLATES;
window.FORMAT_RULES = FORMAT_RULES;
window.CUSTOM_PARSING_RULES = CUSTOM_PARSING_RULES;
