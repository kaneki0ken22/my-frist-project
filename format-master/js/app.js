// ========================================
// 格式大师 - 主应用逻辑
// ========================================

const AppState = {
    selectedFile: null,
    selectedFileType: null,
    selectedMode: 'template',
    selectedTemplate: null,
    customRequirements: '',
    parsedRequirements: {},
    documentText: '',
    originalLines: [],
    analysisResults: [],
    fixedFileBlob: null,
    fixedFileName: null
};

const DOM = {};

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initDOMElements();
    initEventListeners();
    renderTemplates();
});

// 初始化DOM元素缓存
function initDOMElements() {
    DOM.uploadZone = document.getElementById('uploadZone');
    DOM.fileInput = document.getElementById('fileInput');
    DOM.fileInfoPanel = document.getElementById('fileInfoPanel');
    DOM.fileName = document.getElementById('fileName');
    DOM.fileSize = document.getElementById('fileSize');
    DOM.fileType = document.getElementById('fileType');
    DOM.modeSection = document.getElementById('modeSection');
    DOM.templatePanel = document.getElementById('templatePanel');
    DOM.customPanel = document.getElementById('customPanel');
    DOM.templateGrid = document.getElementById('templateGrid');
    DOM.customRequirements = document.getElementById('customRequirements');
    DOM.parsedPreview = document.getElementById('parsedPreview');
    DOM.parsedItems = document.getElementById('parsedItems');
    DOM.analyzeBtn = document.getElementById('analyzeBtn');
    DOM.resultSection = document.getElementById('resultSection');
    DOM.currentModeBadge = document.getElementById('currentModeBadge');
    DOM.currentModeDesc = document.getElementById('currentModeDesc');
    DOM.issueNum = document.getElementById('issueNum');
    DOM.issuesList = document.getElementById('issuesList');
    DOM.successSection = document.getElementById('successSection');
    DOM.fixedList = document.getElementById('fixedList');
    DOM.loadingCover = document.getElementById('loadingCover');
    DOM.loadingText = document.getElementById('loadingText');
    DOM.templateModal = document.getElementById('templateModal');
    DOM.helpModal = document.getElementById('helpModal');
}

// 初始化事件监听
function initEventListeners() {
    DOM.uploadZone.addEventListener('dragover', handleDragOver);
    DOM.uploadZone.addEventListener('dragleave', handleDragLeave);
    DOM.uploadZone.addEventListener('drop', handleDrop);
    DOM.uploadZone.addEventListener('click', () => DOM.fileInput.click());
    DOM.fileInput.addEventListener('change', handleFileSelect);
    DOM.customRequirements.addEventListener('input', debounce(parseCustomRequirements, 500));
}

// 渲染模板卡片
function renderTemplates() {
    DOM.templateGrid.innerHTML = TEMPLATES.map(template => `
        <div class="template-card" data-id="${template.id}" onclick="showTemplateDetail('${template.id}')">
            <div class="template-card-header">
                <span class="template-icon">${template.icon}</span>
                <span class="template-badge badge-${template.badgeColor}">${template.badge}</span>
            </div>
            <div class="template-name">${template.name}</div>
            <div class="template-desc">${template.description}</div>
            <div class="template-tags">
                ${template.tags.slice(0, 3).map(tag => `<span class="template-tag">${tag}</span>`).join('')}
            </div>
            <button class="template-view-btn" onclick="event.stopPropagation(); showTemplateDetail('${template.id}')">查看规范</button>
        </div>
    `).join('');
}

// 显示模板详情
function showTemplateDetail(templateId) {
    const template = TEMPLATES.find(t => t.id === templateId);
    if (!template) return;

    document.getElementById('modalIcon').textContent = template.icon;
    document.getElementById('modalTitle').textContent = template.name;
    document.getElementById('modalBadge').textContent = template.badge;
    document.getElementById('modalBadge').className = `modal-badge badge-${template.badgeColor}`;

    let specsHTML = '';
    const specKeys = ['pageSetup', 'font', 'fontSize', 'paragraph', 'lineHeight', 'alignment', 'layout', 'spacing', 'color', 'hierarchy', 'special'];

    specKeys.forEach(key => {
        if (template.specs[key]) {
            specsHTML += `
                <div class="spec-box">
                    <div class="spec-title">${template.specs[key].title}</div>
                    ${template.specs[key].items.map(item => `<div class="spec-item">• ${item}</div>`).join('')}
                </div>
            `;
        }
    });

    document.getElementById('modalBody').innerHTML = `
        <div class="template-spec-grid">${specsHTML}</div>
        <div class="template-structure-box">
            <h4>📋 结构要求</h4>
            <p>${template.structure}</p>
        </div>
    `;

    document.getElementById('selectTemplateBtn').onclick = () => selectTemplate(templateId);
    DOM.templateModal.classList.add('active');
}

function closeTemplateModal() {
    DOM.templateModal.classList.remove('active');
}

function selectTemplate(templateId) {
    AppState.selectedTemplate = templateId;
    document.querySelectorAll('.template-card').forEach(card => {
        card.classList.toggle('selected', card.dataset.id === templateId);
    });
    closeTemplateModal();
}

function switchMode(mode) {
    AppState.selectedMode = mode;
    document.querySelectorAll('.mode-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.mode === mode);
    });
    DOM.templatePanel.style.display = mode === 'template' ? 'block' : 'none';
    DOM.customPanel.style.display = mode === 'custom' ? 'block' : 'none';

    if (mode === 'custom') {
        setTimeout(() => DOM.customRequirements.focus(), 100);
    }
}

function insertTag(keyword) {
    const textarea = DOM.customRequirements;
    const current = textarea.value;
    const suffix = current ? '，' : '';
    textarea.value = current + suffix + keyword + '用';
    textarea.focus();
    parseCustomRequirements();
}

function parseCustomRequirements() {
    const text = DOM.customRequirements.value;
    AppState.customRequirements = text;

    if (!text.trim()) {
        DOM.parsedPreview.style.display = 'none';
        return;
    }

    const parsed = {};
    let html = '';

    const font = CUSTOM_PARSING_RULES.font.extract(text);
    if (font) { parsed.font = font; html += `<div class="parsed-item">字体: ${font}</div>`; }

    const fontSize = CUSTOM_PARSING_RULES.fontSize.extract(text);
    if (fontSize) {
        parsed.fontSize = fontSize;
        html += `<div class="parsed-item">字号: ${fontSize.original || fontSize.value + 'pt'}</div>`;
    }

    const lineHeight = CUSTOM_PARSING_RULES.lineHeight.extract(text);
    if (lineHeight) { parsed.lineHeight = lineHeight; html += `<div class="parsed-item">行距: ${lineHeight}倍</div>`; }

    const textIndent = CUSTOM_PARSING_RULES.textIndent.extract(text);
    if (textIndent) { parsed.textIndent = textIndent; html += `<div class="parsed-item">首行缩进: ${textIndent}字符</div>`; }

    const alignment = CUSTOM_PARSING_RULES.alignment.extract(text);
    if (alignment) {
        parsed.alignment = alignment;
        const alignText = { center: '居中', left: '左对齐', right: '右对齐', justify: '两端对齐' };
        html += `<div class="parsed-item">对齐: ${alignText[alignment] || alignment}</div>`;
    }

    const bold = CUSTOM_PARSING_RULES.bold.extract(text);
    if (bold) { parsed.bold = bold; html += `<div class="parsed-item">标题加粗: 是</div>`; }

    if (html) {
        DOM.parsedItems.innerHTML = html;
        DOM.parsedPreview.style.display = 'block';
        AppState.parsedRequirements = parsed;
    } else {
        DOM.parsedPreview.style.display = 'none';
        AppState.parsedRequirements = {};
    }
}

function handleDragOver(e) {
    e.preventDefault();
    DOM.uploadZone.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    DOM.uploadZone.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    DOM.uploadZone.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) processFile(files[0]);
}

function handleFileSelect(e) {
    const files = e.target.files;
    if (files.length > 0) processFile(files[0]);
}

async function processFile(file) {
    const fileName = file.name.toLowerCase();
    let fileType = null;

    if (fileName.endsWith('.pdf')) fileType = 'pdf';
    else if (fileName.endsWith('.docx')) fileType = 'docx';
    else if (fileName.endsWith('.txt')) fileType = 'txt';
    else {
        alert('不支持的文件格式！请上传 PDF、Word(.docx) 或纯文本(.txt) 文件。');
        return;
    }

    AppState.selectedFile = file;
    AppState.selectedFileType = fileType;

    DOM.fileName.textContent = file.name;
    DOM.fileSize.textContent = formatFileSize(file.size);
    DOM.fileType.textContent = fileType.toUpperCase();
    DOM.fileInfoPanel.style.display = 'block';

    showLoading('正在解析文件...');
    try {
        const result = await extractText(file, fileType);
        AppState.documentText = result.text;
        AppState.originalLines = result.lines;
        hideLoading();
        DOM.modeSection.style.display = 'block';
        DOM.uploadZone.style.display = 'none';
    } catch (error) {
        hideLoading();
        alert('文件解析失败：' + error.message);
    }
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

async function extractText(file, type) {
    if (type === 'txt') {
        const text = await file.text();
        const lines = text.split('\n').map((line, idx) => ({
            number: idx + 1,
            content: line,
            charCount: line.length
        }));
        return { text, lines };
    }
    if (type === 'pdf') {
        const text = await extractPDFText(file);
        const lines = text.split('\n').map((line, idx) => ({
            number: idx + 1,
            content: line,
            charCount: line.length
        }));
        return { text, lines };
    }
    if (type === 'docx') {
        const result = await extractDOCXText(file);
        const lines = result.text.split('\n').map((line, idx) => ({
            number: idx + 1,
            content: line,
            charCount: line.length
        }));
        // 保存DOCX的原始数据用于后续修改
        AppState.docxZip = result.zip;
        return { text: result.text, lines };
    }
    return { text: '', lines: [] };
}

async function extractPDFText(file) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        fullText += textContent.items.map(item => item.str).join(' ') + '\n';
    }
    return fullText;
}

async function extractDOCXText(file) {
    const arrayBuffer = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);

    // 读取主文档内容
    const docXml = await zip.file('word/document.xml')?.async('string');
    if (!docXml) {
        return { text: '[无法解析Word文档内容]', zip };
    }

    // 提取纯文本（简单方式，移除非标签文本）
    const text = docXml
        .replace(/<[^>]+>/g, ' ')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/\s+/g, ' ')
        .trim();

    return { text, zip };
}

function clearFile() {
    AppState.selectedFile = null;
    AppState.selectedFileType = null;
    AppState.documentText = '';
    AppState.originalLines = [];
    AppState.docxZip = null;
    AppState.fixedFileBlob = null;
    DOM.fileInfoPanel.style.display = 'none';
    DOM.modeSection.style.display = 'none';
    DOM.uploadZone.style.display = 'block';
    DOM.fileInput.value = '';
}

function startAnalysis() {
    if (!AppState.selectedFile) { alert('请先上传文件'); return; }
    if (AppState.selectedMode === 'template' && !AppState.selectedTemplate) { alert('请先选择一个模板'); return; }
    if (AppState.selectedMode === 'custom' && !AppState.customRequirements.trim()) { alert('请输入格式要求'); return; }

    showLoading('正在分析文档格式问题...');
    setTimeout(() => {
        performAnalysis();
        hideLoading();
    }, 1500);
}

function performAnalysis() {
    const results = [];
    const template = AppState.selectedMode === 'template' ? TEMPLATES.find(t => t.id === AppState.selectedTemplate) : null;
    const lines = AppState.originalLines;

    // ========== 精确位置分析 ==========

    // 1. 字体规范检测
    const improperFonts = ['华文彩云', '华文行楷', '幼圆', '隶书'];
    improperFonts.forEach(font => {
        lines.forEach((line) => {
            if (line.content.includes(font)) {
                results.push({
                    type: 'font',
                    title: '❌ 字体不规范',
                    lineStart: line.number,
                    lineEnd: line.number,
                    original: line.content.substring(0, 50) + (line.content.length > 50 ? '...' : ''),
                    issue: `第 ${line.number} 行使用了不规范的${font}字体`,
                    suggestion: `建议使用：宋体、黑体、微软雅黑、Times New Roman等规范字体`,
                    status: 'pending'
                });
            }
        });
    });

    // 2. 标点符号检测
    lines.forEach((line) => {
        const hasChinese = /，|。|；|：|！|？/.test(line.content);
        const hasEnglishPunc = /,|;|:|!|\?/.test(line.content);
        if (hasChinese && hasEnglishPunc) {
            results.push({
                type: 'punctuation',
                title: '❌ 中英文标点混用',
                lineStart: line.number,
                lineEnd: line.number,
                original: line.content.substring(0, 50) + (line.content.length > 50 ? '...' : ''),
                issue: `第 ${line.number} 行同时存在中文标点和英文标点`,
                suggestion: '建议统一使用中文标点（，。；：！？）',
                status: 'pending'
            });
        }
    });

    // 3. 首行缩进检测
    if (template) {
        const hasIndentLines = lines.filter(l => /^\s+/.test(l.content) && l.content.trim().length > 0);
        const noIndentLines = lines.filter(l => !/^\s+/.test(l.content) && l.content.trim().length > 0 && l.content.length > 20);

        if (noIndentLines.length > 0 && hasIndentLines.length === 0) {
            results.push({
                type: 'text-indent',
                title: '❌ 缺少首行缩进',
                lineStart: noIndentLines[0].number,
                lineEnd: noIndentLines[Math.min(4, noIndentLines.length - 1)].number,
                original: noIndentLines.slice(0, 3).map(l => `[${l.number}] ${l.content.substring(0, 30)}...`).join('\n'),
                issue: `第 ${noIndentLines[0].number} 行开始的段落缺少首行缩进（共 ${noIndentLines.length} 段）`,
                suggestion: `建议每段首行缩进2字符（按照${template.name}规范）`,
                status: 'pending'
            });
        }
    }

    // 4. 行距检测
    let consecutiveEmpty = 0;
    let lastContentLine = 0;
    lines.forEach((line) => {
        if (line.content.trim() === '') {
            consecutiveEmpty++;
        } else {
            if (consecutiveEmpty > 2 && lastContentLine > 0) {
                results.push({
                    type: 'line-height',
                    title: '❌ 行距过大',
                    lineStart: lastContentLine,
                    lineEnd: line.number,
                    original: `第 ${lastContentLine} 行与第 ${line.number} 行之间有 ${consecutiveEmpty} 个空行`,
                    issue: `段落间距过大，可能影响文档整体美观`,
                    suggestion: '建议保持适当的段落间距',
                    status: 'pending'
                });
            }
            consecutiveEmpty = 0;
            lastContentLine = line.number;
        }
    });

    // 5. 标题层级检测
    const headingPatterns = [
        { pattern: /^[一二三四五六七八九十]+[、、.]/, level: 1, name: '一级标题' },
        { pattern: /^[\(（]?[0-9]+[\)）]?[、.]/, level: 2, name: '二级标题' },
        { pattern: /^[0-9]+[、.]/, level: 3, name: '三级标题' }
    ];
    let lastLevel = 0;
    lines.forEach((line) => {
        for (const hp of headingPatterns) {
            if (hp.pattern.test(line.content.trim())) {
                if (lastLevel > 0 && hp.level > lastLevel + 1) {
                    results.push({
                        type: 'heading',
                        title: '❌ 标题层级跳跃',
                        lineStart: line.number,
                        lineEnd: line.number,
                        original: line.content.substring(0, 40),
                        issue: `第 ${line.number} 行：从第${lastLevel}级直接跳到第${hp.level}级`,
                        suggestion: `建议使用连续的标题层级，如 1 → 1.1 → 1.1.1`,
                        status: 'pending'
                    });
                }
                lastLevel = hp.level;
                break;
            }
        }
    });

    // 6. 自定义需求检测
    if (AppState.selectedMode === 'custom' && Object.keys(AppState.parsedRequirements).length > 0) {
        const reqs = AppState.parsedRequirements;

        if (reqs.font) {
            results.push({
                type: 'custom-font',
                title: '📝 自定义字体要求',
                lineStart: 0,
                lineEnd: 0,
                original: '',
                issue: `需要将字体修改为：${reqs.font}`,
                suggestion: '系统将自动应用此修改',
                status: 'pending',
                autoFix: { field: 'font', value: reqs.font }
            });
        }

        if (reqs.fontSize) {
            results.push({
                type: 'custom-fontsize',
                title: '📝 自定义字号要求',
                lineStart: 0,
                lineEnd: 0,
                original: '',
                issue: `需要将字号修改为：${reqs.fontSize.original || reqs.fontSize.value + 'pt'}`,
                suggestion: '系统将自动应用此修改',
                status: 'pending',
                autoFix: { field: 'fontSize', value: reqs.fontSize }
            });
        }

        if (reqs.lineHeight) {
            results.push({
                type: 'custom-lineheight',
                title: '📝 自定义行距要求',
                lineStart: 0,
                lineEnd: 0,
                original: '',
                issue: `需要将行距修改为：${reqs.lineHeight}倍`,
                suggestion: '系统将自动应用此修改',
                status: 'pending',
                autoFix: { field: 'lineHeight', value: reqs.lineHeight }
            });
        }

        if (reqs.textIndent) {
            results.push({
                type: 'custom-textindent',
                title: '📝 自定义首行缩进要求',
                lineStart: 0,
                lineEnd: 0,
                original: '',
                issue: `需要设置首行缩进：${reqs.textIndent}字符`,
                suggestion: '系统将自动应用此修改',
                status: 'pending',
                autoFix: { field: 'textIndent', value: reqs.textIndent }
            });
        }
    }

    // 7. 模板匹配度检测
    if (template && results.length > 0) {
        results.push({
            type: 'template-match',
            title: `📋 模板：${template.name}`,
            lineStart: 0,
            lineEnd: 0,
            original: '',
            issue: `文档格式与「${template.name}」模板存在 ${results.filter(r => r.type !== 'template-match').length} 处差异`,
            suggestion: `请参考 ${template.name} 的规范进行调整`,
            status: 'pending'
        });
    }

    if (results.length === 0) {
        results.push({
            type: 'success',
            title: '✅ 格式检查通过',
            lineStart: 0,
            lineEnd: 0,
            original: '',
            issue: '您的文档格式符合要求，无需修改。',
            suggestion: '',
            status: 'success'
        });
    }

    AppState.analysisResults = results;
    showResults();
}

function showResults() {
    DOM.modeSection.style.display = 'none';
    DOM.resultSection.style.display = 'block';

    if (AppState.selectedMode === 'template') {
        const template = TEMPLATES.find(t => t.id === AppState.selectedTemplate);
        DOM.currentModeBadge.textContent = template ? template.name : '';
        DOM.currentModeDesc.textContent = template ? template.description : '';
    } else {
        DOM.currentModeBadge.textContent = '自定义需求';
        DOM.currentModeDesc.textContent = `已识别 ${Object.keys(AppState.parsedRequirements).length} 项格式要求`;
    }

    const issueCount = AppState.analysisResults.filter(r => r.type !== 'template-match' && r.type !== 'success').length;
    DOM.issueNum.textContent = issueCount;

    DOM.issuesList.innerHTML = AppState.analysisResults.map((issue) => {
        const hasLocation = issue.lineStart > 0;
        const locationHTML = hasLocation ?
            `<div class="issue-location">📍 位置：第 ${issue.lineStart}${issue.lineEnd !== issue.lineStart ? '-' + issue.lineEnd : ''} 行</div>` : '';

        const originalHTML = issue.original ?
            `<div class="issue-original"><span class="label">原文：</span><code>${escapeHtml(issue.original.substring(0, 80))}${issue.original.length > 80 ? '...' : ''}</code></div>` : '';

        return `
            <div class="issue-item ${issue.status === 'success' ? 'issue-success' : ''}">
                <div class="issue-header">
                    <span class="issue-icon">${issue.status === 'success' ? '✅' : '⚠️'}</span>
                    <span class="issue-title">${issue.title}</span>
                    <span class="issue-status">${issue.status === 'success' ? '通过' : (issue.autoFix ? '自动修复' : '待修复')}</span>
                </div>
                <div class="issue-body">
                    ${locationHTML}
                    <div class="issue-desc">${issue.issue}</div>
                    ${originalHTML}
                    ${issue.suggestion ? `<div class="issue-suggestion">💡 建议：${issue.suggestion}</div>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function goBack() {
    DOM.resultSection.style.display = 'none';
    DOM.modeSection.style.display = 'block';
}

async function fixAllIssues() {
    showLoading('正在处理文件...');

    try {
        const fileType = AppState.selectedFileType;

        if (fileType === 'txt') {
            // TXT文件：直接修改文本并下载
            const fixedContent = generateFixedText();
            AppState.fixedFileBlob = new Blob([fixedContent], { type: 'text/plain;charset=utf-8' });
            const baseName = AppState.selectedFile.name.replace(/\.[^.]+$/, '');
            AppState.fixedFileName = `${baseName}_格式修正版.txt`;
        } else if (fileType === 'docx') {
            // DOCX文件：使用JSZip修改并下载
            const result = await generateFixedDOCX();
            AppState.fixedFileBlob = result.blob;
            const baseName = AppState.selectedFile.name.replace(/\.[^.]+$/, '');
            AppState.fixedFileName = `${baseName}_格式修正版.docx`;
        } else {
            // PDF/图片等：在界面上直接显示修改建议
            AppState.fixedFileBlob = null;
            AppState.fixedFileName = null;
        }

        AppState.analysisResults.forEach(issue => issue.status = 'fixed');
        hideLoading();
        showSuccess();
    } catch (error) {
        hideLoading();
        alert('处理失败：' + error.message);
    }
}

// 生成修正后的文本内容
function generateFixedText() {
    let content = AppState.documentText;
    const fixes = AppState.analysisResults.filter(r => r.autoFix);

    fixes.forEach(fix => {
        switch(fix.autoFix.field) {
            case 'punctuation':
                content = content.replace(/,/g, '，').replace(/;/g, '；').replace(/:/g, '：');
                content = content.replace(/!/g, '！').replace(/\?/g, '？');
                break;
            case 'textIndent':
                const indent = '　　';
                content = content.split('\n').map(line => {
                    if (line.trim().length > 0 && !/^\s+/.test(line)) {
                        return indent + line;
                    }
                    return line;
                }).join('\n');
                break;
        }
    });

    return content;
}

// 使用JSZip生成修正后的DOCX
async function generateFixedDOCX() {
    if (!AppState.docxZip) {
        throw new Error('DOCX文件数据丢失');
    }

    const zip = AppState.docxZip;
    const docXml = await zip.file('word/document.xml')?.async('string');

    if (!docXml) {
        throw new Error('无法读取Word文档内容');
    }

    let xml = docXml;
    const fixes = AppState.analysisResults.filter(r => r.autoFix);

    fixes.forEach(fix => {
        switch(fix.autoFix.field) {
            case 'punctuation':
                // 替换英文标点为中文标点（处理XML实体）
                xml = xml.replace(/&,/g, '&，')
                         .replace(/&;/g, '&；')
                         .replace(/&:/g, '&：')
                         .replace(/&!/g, '&！')
                         .replace(/&\?/g, '&？');
                // 直接替换字符
                xml = xml.replace(/,/g, '，').replace(/;/g, '；').replace(/:/g, '：');
                xml = xml.replace(/!/g, '！').replace(/\?/g, '？');
                break;
        }
    });

    // 更新文档XML
    zip.file('word/document.xml', xml);

    // 生成新的DOCX文件
    const blob = await zip.generateAsync({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 }
    });

    return { blob };
}

// 生成PDF/图片的修改意见指南
function generateModificationGuide() {
    const lines = [];
    const sep = '=======================================\n';

    lines.push(sep);
    lines.push('       格式大师 - 格式修改意见\n');
    lines.push(sep);
    lines.push(`\n原始文件：${AppState.selectedFile.name}`);
    lines.push(`文件类型：${AppState.selectedFileType.toUpperCase()}`);
    lines.push(`生成时间：${new Date().toLocaleString()}`);

    if (AppState.selectedMode === 'template') {
        const t = TEMPLATES.find(t => t.id === AppState.selectedTemplate);
        lines.push(`\n参照模板：${t ? t.name : ''}`);
    }

    lines.push('\n' + sep);
    lines.push('         具体修改位置\n');
    lines.push(sep);

    let idx = 1;
    const actionableIssues = AppState.analysisResults.filter(r => r.type !== 'template-match' && r.type !== 'success' && r.lineStart > 0);

    actionableIssues.forEach(issue => {
        lines.push(`\n【问题 ${idx}】${issue.title}`);
        lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        lines.push(`📍 位置：第 ${issue.lineStart}${issue.lineEnd !== issue.lineStart ? '-' + issue.lineEnd : ''} 行`);
        if (issue.original) {
            lines.push(`\n📄 原文：`);
            lines.push(`   ${issue.original.split('\n').join('\n   ')}`);
        }
        lines.push(`\n💡 问题：${issue.issue}`);
        lines.push(`\n🔧 修改建议：${issue.suggestion}`);
        lines.push('');
        idx++;
    });

    const autoFixes = AppState.analysisResults.filter(r => r.autoFix);
    if (autoFixes.length > 0) {
        lines.push('\n' + sep);
        lines.push('       已自动修复的项目\n');
        lines.push(sep);

        autoFixes.forEach(fix => {
            lines.push(`\n✅ ${fix.title}`);
            lines.push(`   ${fix.issue}`);
        });
    }

    if (AppState.selectedMode === 'template') {
        const t = TEMPLATES.find(t => t.id === AppState.selectedTemplate);
        if (t) {
            lines.push('\n' + sep);
            lines.push(`       ${t.name} 格式规范参考\n`);
            lines.push(sep);

            Object.values(t.specs).forEach(spec => {
                lines.push(`\n【${spec.title}】`);
                spec.items.forEach(item => lines.push(`  • ${item}`));
            });
        }
    }

    lines.push('\n' + sep);
    lines.push('   请参照上述位置手动修改您的文档\n');
    lines.push(sep);

    return lines.join('\n');
}

function showSuccess() {
    DOM.resultSection.style.display = 'none';
    DOM.successSection.style.display = 'block';

    const fixedCount = AppState.analysisResults.filter(r => r.status === 'fixed' && r.type !== 'template-match').length;
    const fileType = AppState.selectedFileType;

    let outputType = '';
    let outputDesc = '';
    let showDownload = true;
    let showSuggestions = false;

    if (fileType === 'txt') {
        outputType = 'TXT';
        outputDesc = '已生成修正后的TXT文件';
    } else if (fileType === 'docx') {
        outputType = 'DOCX';
        outputDesc = '已生成修正后的Word文件';
    } else {
        // PDF/图片：直接在界面显示修改建议
        showDownload = false;
        showSuggestions = true;
    }

    if (showSuggestions) {
        // 直接显示修改建议
        const suggestionsHTML = generateSuggestionsHTML();
        DOM.fixedList.innerHTML = `
            <div class="fixed-summary">
                <span class="fixed-icon">📋</span>
                <span class="fixed-text">格式修改建议</span>
            </div>
            <div class="fixed-suggestions">
                ${suggestionsHTML}
            </div>
        `;
    } else {
        DOM.fixedList.innerHTML = `
            <div class="fixed-summary">
                <span class="fixed-icon">✅</span>
                <span class="fixed-text">已完成 ${fixedCount} 项格式修正</span>
            </div>
            <div class="fixed-note">
                ${outputDesc}，点击下方按钮下载。
            </div>
        `;
    }

    const downloadBtn = document.querySelector('.success-actions .btn-primary-lg');
    if (downloadBtn) {
        if (showDownload) {
            downloadBtn.style.display = '';
            downloadBtn.innerHTML = `
                <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 3v14M5 10l7 7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>
                下载修正后的文件
            `;
        } else {
            downloadBtn.style.display = 'none';
        }
    }
}

// 生成界面显示的修改建议HTML
function generateSuggestionsHTML() {
    const actionableIssues = AppState.analysisResults.filter(r =>
        r.type !== 'template-match' &&
        r.type !== 'success' &&
        r.lineStart > 0
    );

    if (actionableIssues.length === 0) {
        return '<div class="no-suggestions">未发现需要修改的问题</div>';
    }

    return actionableIssues.map((issue, idx) => `
        <div class="suggestion-item">
            <div class="suggestion-header">
                <span class="suggestion-num">${idx + 1}</span>
                <span class="suggestion-title">${issue.title}</span>
            </div>
            <div class="suggestion-body">
                <div class="suggestion-location">📍 位置：第 ${issue.lineStart}${issue.lineEnd !== issue.lineStart ? '-' + issue.lineEnd : ''} 行</div>
                ${issue.original ? `<div class="suggestion-original"><span class="label">原文：</span>${escapeHtml(issue.original.substring(0, 60))}${issue.original.length > 60 ? '...' : ''}</div>` : ''}
                <div class="suggestion-issue">💡 ${issue.issue}</div>
                <div class="suggestion-fix">🔧 修改建议：${issue.suggestion}</div>
            </div>
        </div>
    `).join('');
}

function downloadFixedFile() {
    if (!AppState.fixedFileBlob) {
        alert('没有可下载的文件');
        return;
    }

    const url = URL.createObjectURL(AppState.fixedFileBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = AppState.fixedFileName || '格式修正版.txt';
    a.click();
    URL.revokeObjectURL(url);
}

function downloadReport() {
    const report = generateReport();
    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `格式分析详情_${formatDate()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

function generateReport() {
    let report = `=======================================\n`;
    report += `       格式大师 - 格式分析报告\n`;
    report += `=======================================\n\n`;
    report += `生成时间：${new Date().toLocaleString()}\n`;
    report += `文件：${AppState.selectedFile ? AppState.selectedFile.name : '未知'}\n`;
    report += `模式：${AppState.selectedMode === 'template' ? '模板模式' : '自定义需求模式'}\n\n`;

    if (AppState.selectedMode === 'template') {
        const t = TEMPLATES.find(t => t.id === AppState.selectedTemplate);
        report += `模板：${t ? t.name : ''}\n\n`;
    } else {
        report += `自定义要求：\n`;
        Object.entries(AppState.parsedRequirements).forEach(([k, v]) => {
            report += `  • ${k}: ${typeof v === 'object' ? JSON.stringify(v) : v}\n`;
        });
        report += '\n';
    }

    report += `---------------------------------------\n`;
    report += `         发现的问题\n`;
    report += `---------------------------------------\n\n`;

    AppState.analysisResults.forEach((issue, i) => {
        if (issue.lineStart > 0) {
            report += `${i + 1}. ${issue.title}\n`;
            report += `   📍 位置：第 ${issue.lineStart}${issue.lineEnd !== issue.lineStart ? '-' + issue.lineEnd : ''} 行\n`;
            report += `   问题：${issue.issue}\n`;
            if (issue.original) report += `   原文：${issue.original.substring(0, 60)}...\n`;
            if (issue.suggestion) report += `   💡 ${issue.suggestion}\n`;
            report += '\n';
        } else {
            report += `${i + 1}. ${issue.title}\n`;
            report += `   ${issue.issue}\n\n`;
        }
    });

    return report;
}

function formatDate() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function startOver() {
    Object.keys(AppState).forEach(k => {
        if (Array.isArray(AppState[k])) AppState[k] = [];
        else if (typeof AppState[k] === 'string') AppState[k] = '';
        else AppState[k] = null;
    });
    AppState.docxZip = null;
    AppState.fixedFileBlob = null;
    AppState.fixedFileName = null;

    DOM.successSection.style.display = 'none';
    DOM.resultSection.style.display = 'none';
    DOM.modeSection.style.display = 'none';
    DOM.fileInfoPanel.style.display = 'none';
    DOM.uploadZone.style.display = 'block';
    DOM.fileInput.value = '';
    DOM.customRequirements.value = '';
    DOM.parsedPreview.style.display = 'none';
    document.querySelectorAll('.template-card').forEach(c => c.classList.remove('selected'));
    switchMode('template');
}

function showLoading(text = '加载中...') {
    DOM.loadingText.textContent = text;
    DOM.loadingCover.style.display = 'flex';
}

function hideLoading() {
    DOM.loadingCover.style.display = 'none';
}

function showHelp() {
    DOM.helpModal.classList.add('active');
}

function closeHelpModal() {
    DOM.helpModal.classList.remove('active');
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
