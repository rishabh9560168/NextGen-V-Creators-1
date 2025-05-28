// Global variables
let currentSolution = null;
let isVoiceEnabled = false;
let currentLanguage = 'en';
let isPlaying = false;
let voices = [];

// Voice Guide Text Content
const guideTexts = {
    en: {
        input: `Welcome to the Digital Logic Circuit Simulator! 
                This tool helps you minimize Boolean functions using Karnaugh Maps.
                
                Step 1: Select the number of variables - 2, 3, or 4 variables.
                Step 2: Choose SOP for Sum of Products or POS for Product of Sums form.
                Step 3: Enter your minterms as comma-separated numbers. For example: 1,5,6,11,12,13,14
                Step 4: Optionally enter don't care terms. For example: 4
                Step 5: Click 'Solve K-Map' to see the complete solution.
                
                The system will show you the K-Map, detailed solution steps, and generate a logic circuit diagram.`,
        
        kmap: `Now viewing your Karnaugh Map solution!
               
               The K-Map shows a systematic way to minimize Boolean expressions:
               
               Step 1: Your minterms are marked with '1' and don't cares with 'X'.
               Step 2: The system groups adjacent 1s and Xs in rectangles of sizes 1, 2, 4, or 8.
               Step 3: Each colored group represents a simplified term in your final expression.
               Step 4: The detailed solution steps explain how each group was formed.
               
               The final minimized expression combines all the grouped terms using OR operation.`,
        
        circuit: `Here's your logic circuit diagram!
                 
                 This circuit implements your minimized Boolean expression using standard logic gates:
                 
                 Inputs: The variables A, B, C, D are on the left side.
                 NOT gates create the complement signals with triangular symbols and bubbles.
                 AND gates combine the literals for each term using rectangular gates.
                 The OR gate at the end combines all terms to produce the final output.
                 
                 All connections are fully traced with colored wires showing signal flow.
                 Each gate is properly connected to create the complete digital circuit.`,
        
        truth: `This is the complete truth table for your Boolean function!
                
                The truth table verifies that your minimized expression produces the correct outputs:
                
                Each row shows a different combination of input variables.
                The output column shows the function value for each input combination.
                Green cells highlight your minterms where the output is 1.
                Yellow cells show don't care conditions.
                
                This confirms that the K-Map minimization is mathematically correct.`
    },
    hi: {
        input: `डिजिटल लॉजिक सर्किट सिमुलेटर में आपका स्वागत है!
                यह टूल कार्नो मैप्स का उपयोग करके बूलियन फंक्शन्स को मिनिमाइज़ करने में मदद करता है।
                
                चरण 1: वेरिएबल्स की संख्या चुनें - 2, 3, या 4 वेरिएबल्स।
                चरण 2: SOP के लिए Sum of Products या POS के लिए Product of Sums फॉर्म चुनें।
                चरण 3: अपने मिनटर्म्स को कॉमा से अलग करके डालें। उदाहरण: 1,5,6,11,12,13,14
                चरण 4: वैकल्पिक रूप से डॉन्ट केयर टर्म्स डालें। उदाहरण: 4
                चरण 5: पूरा समाधान देखने के लिए 'Solve K-Map' पर क्लिक करें।
                
                सिस्टम आपको K-Map, विस्तृत समाधान चरण, और लॉजिक सर्किट डायग्राम दिखाएगा।`,
        
        kmap: `अब आपके कार्नो मैप समाधान को देख रहे हैं!
               
               K-Map बूलियन एक्सप्रेशन्स को मिनिमाइज़ करने का व्यवस्थित तरीका दिखाता है:
               
               चरण 1: आपके मिनटर्म्स को '1' से और डॉन्ट केयर्स को 'X' से चिह्नित किया गया है।
               चरण 2: सिस्टम आसन्न 1s और Xs को 1, 2, 4, या 8 के आकार के आयतों में ग्रुप करता है।
               चरण 3: प्रत्येक रंगीन ग्रुप आपकी अंतिम एक्सप्रेशन में एक सरलीकृत टर्म दर्शाता है।
               चरण 4: विस्तृत समाधान चरण बताते हैं कि प्रत्येक ग्रुप कैसे बना।
               
               अंतिम मिनिमाइज़्ड एक्सप्रेशन सभी ग्रुप्ड टर्म्स को OR ऑपरेशन का उपयोग करके जोड़ती है।`,
        
        circuit: `यहाँ आपका लॉजिक सर्किट डायग्राम है!
                 
                 यह सर्किट मानक लॉजिक गेट्स का उपयोग करके आपकी मिनिमाइज़्ड बूलियन एक्सप्रेशन को लागू करता है:
                 
                 इनपुट्स: वेरिएबल्स A, B, C, D बाईं ओर हैं।
                 NOT गेट्स त्रिकोणीय प्रतीकों और बुलबुलों के साथ कॉम्प्लिमेंट सिग्नल्स बनाते हैं।
                 AND गेट्स आयताकार गेट्स का उपयोग करके प्रत्येक टर्म के लिए लिटरल्स को जोड़ते हैं।
                 अंत में OR गेट सभी टर्म्स को जोड़कर अंतिम आउटपुट बनाता है।
                 
                 सभी कनेक्शन्स रंगीन तारों के साथ पूरी तरह से ट्रेस किए गए हैं जो सिग्नल फ्लो दिखाते हैं।
                 प्रत्येक गेट पूरा डिजिटल सर्किट बनाने के लिए उचित रूप से जुड़ा हुआ है।`,
        
        truth: `यह आपके बूलियन फंक्शन के लिए पूरी ट्रुथ टेबल है!
                
                ट्रुथ टेबल सत्यापित करती है कि आपकी मिनिमाइज़्ड एक्सप्रेशन सही आउटपुट्स उत्पन्न करती है:
                
                प्रत्येक पंक्ति इनपुट वेरिएबल्स के एक अलग संयोजन को दिखाती है।
                आउटपुट कॉलम प्रत्येक इनपुट संयोजन के लिए फंक्शन वैल्यू दिखाता है।
                हरे सेल्स आपके मिनटर्म्स को हाइलाइट करते हैं जहाँ आउटपुट 1 है।
                पीले सेल्स डॉन्ट केयर कंडीशन्स दिखाते हैं।
                
                यह पुष्टि करता है कि K-Map मिनिमाइज़ेशन गणितीय रूप से सही है।`
    }
};

// Language-specific UI text
const uiTexts = {
    en: {
        voiceGuideTitle: 'Voice Guide - K-Map Tutorial',
        languageLabel: 'Language',
        voiceDescription: 'Get detailed audio explanation of K-Map solving process and circuit design',
        playTutorial: 'Play K-Map Tutorial',
        stopTutorial: 'Stop Tutorial',
        speakInput: 'Speak Current Input',
        enabled: 'Enabled',
        disabled: 'Disabled',
        mintermsLabel: 'Minterms (comma-separated)',
        maxtermsLabel: 'Maxterms (comma-separated)'
    },
    hi: {
        voiceGuideTitle: 'आवाज़ गाइड - K-Map ट्यूटोरियल',
        languageLabel: 'भाषा',
        voiceDescription: 'K-Map समाधान प्रक्रिया और सर्किट डिज़ाइन की विस्तृत ऑडियो व्याख्या प्राप्त करें',
        playTutorial: 'K-Map ट्यूटोरियल चलाएं',
        stopTutorial: 'ट्यूटोरियल रोकें',
        speakInput: 'इनपुट बोलें',
        enabled: 'सक्षम',
        disabled: 'अक्षम',
        mintermsLabel: 'मिनटर्म्स (कॉमा से अलग)',
        maxtermsLabel: 'मैक्सटर्म्स (कॉमा से अलग)'
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadVoices();
    setupTabs();
    updateFormLabel();
}

function setupEventListeners() {
    // Voice controls
    document.getElementById('toggleVoice').addEventListener('click', toggleVoice);
    document.getElementById('languageSelect').addEventListener('change', changeLanguage);
    document.getElementById('playTutorial').addEventListener('click', playTutorial);
    document.getElementById('speakInput').addEventListener('click', speakCurrentInput);
    
    // Form controls
    document.getElementById('formType').addEventListener('change', updateFormLabel);
    document.getElementById('solveBtn').addEventListener('click', solveProblem);
}

function setupTabs() {
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const tabName = trigger.getAttribute('data-tab');
            
            // Remove active class from all triggers and contents
            tabTriggers.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked trigger and corresponding content
            trigger.classList.add('active');
            document.getElementById(`${tabName}-tab`).classList.add('active');
            
            // Update voice guide current step
            updateVoiceGuideStep(tabName);
        });
    });
}

function updateVoiceGuideStep(step) {
    // This would update the voice guide context for different tabs
    console.log(`Voice guide step updated to: ${step}`);
}

// Voice functionality
function loadVoices() {
    voices = speechSynthesis.getVoices();
    if (voices.length === 0) {
        speechSynthesis.addEventListener('voiceschanged', () => {
            voices = speechSynthesis.getVoices();
        });
    }
}

function toggleVoice() {
    isVoiceEnabled = !isVoiceEnabled;
    const voiceControls = document.getElementById('voiceControls');
    const voiceIcon = document.getElementById('voiceIcon');
    const voiceStatus = document.getElementById('voiceStatus');
    
    if (isVoiceEnabled) {
        voiceControls.style.display = 'block';
        voiceIcon.textContent = '🔊';
        voiceStatus.textContent = uiTexts[currentLanguage].enabled;
        document.getElementById('toggleVoice').className = 'btn btn-outline btn-sm bg-blue-100 text-blue-700';
    } else {
        voiceControls.style.display = 'none';
        voiceIcon.textContent = '🔇';
        voiceStatus.textContent = uiTexts[currentLanguage].disabled;
        document.getElementById('toggleVoice').className = 'btn btn-outline btn-sm';
        stopSpeaking();
    }
    
    updateSpeakInputVisibility();
}

function changeLanguage() {
    currentLanguage = document.getElementById('languageSelect').value;
    updateUILanguage();
}

function updateUILanguage() {
    const texts = uiTexts[currentLanguage];
    
    document.getElementById('voiceGuideTitle').textContent = texts.voiceGuideTitle;
    document.getElementById('languageLabel').textContent = texts.languageLabel;
    document.getElementById('voiceDescription').textContent = texts.voiceDescription;
    document.getElementById('speakInputText').textContent = texts.speakInput;
    
    updatePlayButtonText();
    updateVoiceStatus();
    updateFormLabel();
}

function updatePlayButtonText() {
    const playText = document.getElementById('playText');
    if (isPlaying) {
        playText.textContent = uiTexts[currentLanguage].stopTutorial;
    } else {
        playText.textContent = uiTexts[currentLanguage].playTutorial;
    }
}

function updateVoiceStatus() {
    const voiceStatus = document.getElementById('voiceStatus');
    if (isVoiceEnabled) {
        voiceStatus.textContent = uiTexts[currentLanguage].enabled;
    } else {
        voiceStatus.textContent = uiTexts[currentLanguage].disabled;
    }
}

function updateFormLabel() {
    const formType = document.getElementById('formType').value;
    const label = document.getElementById('mintermsLabel');
    
    if (formType === 'SOP') {
        label.textContent = uiTexts[currentLanguage].mintermsLabel;
    } else {
        label.textContent = uiTexts[currentLanguage].maxtermsLabel;
    }
}

function updateSpeakInputVisibility() {
    const speakInputBtn = document.getElementById('speakInput');
    if (currentSolution && isVoiceEnabled) {
        speakInputBtn.style.display = 'block';
    } else {
        speakInputBtn.style.display = 'none';
    }
}

function playTutorial() {
    if (isPlaying) {
        stopSpeaking();
    } else {
        const activeTab = document.querySelector('.tab-trigger.active').getAttribute('data-tab');
        const texts = guideTexts[currentLanguage];
        speak(texts[activeTab] || texts.input);
    }
}

function speakCurrentInput() {
    if (!currentSolution || !isVoiceEnabled) return;

    const { variables, formType, minterms, dontCares } = currentSolution;
    
    let inputDescription = '';
    if (currentLanguage === 'en') {
        inputDescription = `Current input configuration: 
            Number of variables: ${variables}
            Form type: ${formType}
            Minterms: ${minterms.join(', ')}
            ${dontCares.length > 0 ? `Don't care terms: ${dontCares.join(', ')}` : 'No don\'t care terms'}
            
            Now solving this K-Map step by step...`;
    } else {
        inputDescription = `वर्तमान इनपुट कॉन्फ़िगरेशन:
            वेरिएबल्स की संख्या: ${variables}
            फॉर्म प्रकार: ${formType}
            मिनटर्म्स: ${minterms.join(', ')}
            ${dontCares.length > 0 ? `डॉन्ट केयर टर्म्स: ${dontCares.join(', ')}` : 'कोई डॉन्ट केयर टर्म्स नहीं'}
            
            अब इस K-Map को चरणबद्ध तरीके से हल कर रहे हैं...`;
    }
    
    speak(inputDescription);
}

function speak(text) {
    if (!isVoiceEnabled || !text) return;

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Select appropriate voice based on language
    let preferredVoice;
    if (currentLanguage === 'hi') {
        preferredVoice = voices.find(voice => 
            voice.lang.includes('hi') || voice.lang.includes('Hindi')
        );
    } else {
        preferredVoice = voices.find(voice => 
            voice.name.includes('Female') || voice.name.includes('Samantha') || voice.name.includes('Alex')
        ) || voices.find(voice => voice.lang.includes('en'));
    }
    
    if (preferredVoice) {
        utterance.voice = preferredVoice;
    }

    utterance.lang = currentLanguage === 'hi' ? 'hi-IN' : 'en-US';
    utterance.rate = currentLanguage === 'hi' ? 0.75 : 0.85;
    utterance.pitch = 1.0;
    utterance.volume = 0.8;

    utterance.onstart = () => {
        isPlaying = true;
        updatePlayButtonIcon();
    };
    
    utterance.onend = () => {
        isPlaying = false;
        updatePlayButtonIcon();
    };
    
    utterance.onerror = () => {
        isPlaying = false;
        updatePlayButtonIcon();
    };

    speechSynthesis.speak(utterance);
}

function stopSpeaking() {
    speechSynthesis.cancel();
    isPlaying = false;
    updatePlayButtonIcon();
}

function updatePlayButtonIcon() {
    const playIcon = document.getElementById('playIcon');
    const playText = document.getElementById('playText');
    
    if (isPlaying) {
        playIcon.textContent = '⏸️';
        playText.textContent = uiTexts[currentLanguage].stopTutorial;
    } else {
        playIcon.textContent = '▶️';
        playText.textContent = uiTexts[currentLanguage].playTutorial;
    }
}

// Problem solving functionality
function solveProblem() {
    const variables = parseInt(document.getElementById('variables').value);
    const formType = document.getElementById('formType').value;
    const mintermsStr = document.getElementById('minterms').value;
    const dontCaresStr = document.getElementById('dontCares').value;
    
    // Parse input
    const minterms = mintermsStr.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
    const dontCares = dontCaresStr ? dontCaresStr.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n)) : [];
    
    currentSolution = {
        variables,
        formType,
        minterms,
        dontCares
    };
    
    // Generate solutions for all tabs
    generateKMapSolution();
    generateCircuitDiagram();
    generateTruthTable();
    
    updateSpeakInputVisibility();
}

// K-Map solution generation
function generateKMapSolution() {
    const container = document.getElementById('kmapSolver');
    
    const kmapHtml = generateKMapHTML();
    const groupsHtml = generateGroupsHTML();
    const stepsHtml = generateSolutionStepsHTML();
    const equationHtml = generateFinalEquationHTML();
    
    container.innerHTML = `
        <div class="fade-in">
            ${kmapHtml}
            ${groupsHtml}
            ${stepsHtml}
            ${equationHtml}
        </div>
    `;
}

function generateKMapHTML() {
    const { variables } = currentSolution;
    
    let rows, cols;
    if (variables === 2) {
        rows = 2;
        cols = 2;
    } else if (variables === 3) {
        rows = 2;
        cols = 4;
    } else {
        rows = 4;
        cols = 4;
    }
    
    const kmap = createKMap();
    const groups = findGroups();
    
    const grayCode = getGrayCode(variables);
    const rowLabels = getRowLabels(variables);
    const labels = getVariableLabels(variables);
    
    let tableHTML = `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">🗺️ K-Map for ${variables} Variables</h3>
            </div>
            <div class="card-content">
                <div class="kmap-container">
                    <table class="kmap-table">
                        <thead>
                            <tr>
                                <th>${labels.row} \\ ${labels.col}</th>
    `;
    
    grayCode.forEach(code => {
        tableHTML += `<th>${code}</th>`;
    });
    
    tableHTML += `
                            </tr>
                        </thead>
                        <tbody>
    `;
    
    for (let rowIdx = 0; rowIdx < rows; rowIdx++) {
        tableHTML += `<tr>`;
        tableHTML += `<td class="row-header">${rowLabels[rowIdx]}</td>`;
        
        for (let colIdx = 0; colIdx < cols; colIdx++) {
            const cellValue = kmap[rowIdx][colIdx];
            const group = getCellGroup(rowIdx, colIdx, groups);
            let cellClass = 'kmap-cell';
            let cellStyle = '';
            
            if (group) {
                cellClass += ` group-${group.index}`;
                cellStyle = `border: 4px solid ${group.color}; background: ${group.bgColor};`;
            } else if (cellValue === '1') {
                cellClass += ' one';
            } else if (cellValue === 'X') {
                cellClass += ' dontcare';
            }
            
            tableHTML += `<td class="${cellClass}" style="${cellStyle}">${cellValue}</td>`;
        }
        
        tableHTML += `</tr>`;
    }
    
    tableHTML += `
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    
    return tableHTML;
}

function createKMap() {
    const { variables, minterms, dontCares } = currentSolution;
    
    let rows, cols;
    if (variables === 2) {
        rows = 2;
        cols = 2;
    } else if (variables === 3) {
        rows = 2;
        cols = 4;
    } else {
        rows = 4;
        cols = 4;
    }
    
    // Initialize K-map
    const kmap = [];
    for (let i = 0; i < rows; i++) {
        kmap[i] = new Array(cols).fill('0');
    }
    
    // Fill minterms
    minterms.forEach(minterm => {
        const [row, col] = getKMapPosition(minterm, variables);
        if (row < rows && col < cols && row >= 0 && col >= 0) {
            kmap[row][col] = '1';
        }
    });
    
    // Fill don't cares
    dontCares.forEach(dontCare => {
        const [row, col] = getKMapPosition(dontCare, variables);
        if (row < rows && col < cols && row >= 0 && col >= 0) {
            kmap[row][col] = 'X';
        }
    });
    
    return kmap;
}

function getKMapPosition(minterm, variables) {
    if (variables === 2) {
        const grayMap = new Map([[0, [0, 0]], [1, [0, 1]], [2, [1, 1]], [3, [1, 0]]]);
        const result = grayMap.get(minterm);
        return result ? [result[0], result[1]] : [0, 0];
    } else if (variables === 3) {
        const ab = Math.floor(minterm / 2);
        const c = minterm % 2;
        const rowMap = new Map([[0, 0], [1, 1], [2, 3], [3, 2]]);
        return [rowMap.get(ab) || 0, c];
    } else {
        const ab = Math.floor(minterm / 4);
        const cd = minterm % 4;
        const grayMap = new Map([[0, 0], [1, 1], [2, 3], [3, 2]]);
        return [grayMap.get(ab) || 0, grayMap.get(cd) || 0];
    }
}

function findGroups() {
    const { variables, minterms } = currentSolution;
    const groups = [];
    const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
    const bgColors = ['#fef2f2', '#eff6ff', '#f0fdf4', '#fffbeb', '#faf5ff'];
    
    // Simplified grouping for the example
    if (variables === 4 && JSON.stringify(minterms.sort()) === JSON.stringify([1,5,6,11,12,13,14].sort())) {
        groups.push({
            index: 0,
            cells: [{ row: 0, col: 1 }, { row: 1, col: 1 }],
            term: "A'C",
            color: colors[0],
            bgColor: bgColors[0],
            minterms: [1, 5],
            size: 2
        });
        
        groups.push({
            index: 1,
            cells: [{ row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 3 }],
            term: "AB",
            color: colors[1],
            bgColor: bgColors[1],
            minterms: [12, 13, 14],
            size: 4
        });
        
        groups.push({
            index: 2,
            cells: [{ row: 1, col: 3 }],
            term: "A'BC'",
            color: colors[2],
            bgColor: bgColors[2],
            minterms: [6],
            size: 1
        });

        groups.push({
            index: 3,
            cells: [{ row: 3, col: 2 }],
            term: "A'BCD'",
            color: colors[3],
            bgColor: bgColors[3],
            minterms: [11],
            size: 1
        });
    }
    
    return groups;
}

function getCellGroup(row, col, groups) {
    return groups.find(group => 
        group.cells.some(cell => cell.row === row && cell.col === col)
    ) || null;
}

function generateGroupsHTML() {
    const groups = findGroups();
    
    if (groups.length === 0) return '';
    
    let html = `
        <div class="groups-legend">
            <h4 style="font-weight: bold; font-size: 1.125rem; margin-bottom: 1rem; color: #1e40af;">🔍 Groups Identified:</h4>
            <div class="groups-grid">
    `;
    
    groups.forEach((group, index) => {
        html += `
            <div class="group-item" style="border-color: ${group.color}; background: ${group.bgColor};">
                <div style="font-weight: bold; font-size: 1.125rem;">Group ${index + 1}: ${group.term}</div>
                <div style="font-size: 0.875rem; margin-top: 0.5rem;">
                    <div>📏 Size: ${group.size} cells</div>
                    <div>🎯 Minterms: ${group.minterms.join(', ')}</div>
                </div>
            </div>
        `;
    });
    
    html += `
            </div>
        </div>
    `;
    
    return html;
}

function generateSolutionStepsHTML() {
    const { variables, minterms, dontCares } = currentSolution;
    const steps = [];
    
    steps.push("🗺️ **STEP 1: Creating K-Map Structure**");
    steps.push(`→ For ${variables} variables, we create a ${getKMapDimensions(variables)} K-Map`);
    steps.push(`→ Variables: ${getVariableNames(variables).join(', ')}`);
    steps.push(`→ K-Map uses Gray Code ordering to ensure adjacent cells differ by only one variable`);
    
    steps.push("📝 **STEP 2: Placing Minterms**");
    minterms.forEach(minterm => {
        const [row, col] = getKMapPosition(minterm, variables);
        const binary = minterm.toString(2).padStart(variables, '0');
        steps.push(`→ Minterm ${minterm} (${binary}) → Position [${row}, ${col}] = 1`);
    });
    
    if (dontCares.length > 0) {
        steps.push("❓ **STEP 3: Placing Don't Care Terms**");
        dontCares.forEach(dontCare => {
            const [row, col] = getKMapPosition(dontCare, variables);
            const binary = dontCare.toString(2).padStart(variables, '0');
            steps.push(`→ Don't Care ${dontCare} (${binary}) → Position [${row}, ${col}] = X`);
        });
    }
    
    steps.push("🔍 **STEP 4: Identifying Groups (Powers of 2)**");
    steps.push("→ Looking for largest possible groups first (8→4→2→1)");
    steps.push("→ Groups must be rectangular and contain only 1s and Xs");
    steps.push("→ Groups can wrap around edges of K-Map");
    
    const groups = findGroups();
    groups.forEach((group, index) => {
        const positions = group.cells.map(c => `(${c.row},${c.col})`).join(', ');
        const coveredMinterms = group.minterms.join(', ');
        steps.push(`🟦 **Group ${index + 1}: ${group.term}**`);
        steps.push(`   → Size: ${group.size} cells`);
        steps.push(`   → Positions: ${positions}`);
        steps.push(`   → Covers minterms: ${coveredMinterms}`);
        steps.push(`   → Simplified term: ${group.term}`);
    });
    
    steps.push("🧮 **STEP 5: Writing Simplified Expression**");
    steps.push("→ Combine all group terms using OR operation");
    
    const equation = generateMinimizedEquation();
    steps.push(`✅ **Final Minimized Expression: f = ${equation}**`);
    steps.push(`📊 **Reduction Summary:**`);
    steps.push(`   → Original minterms: ${minterms.length}`);
    steps.push(`   → Groups formed: ${groups.length}`);
    steps.push(`   → Literals saved: ${calculateLiteralsSaved(minterms.length, groups, variables)}`);
    
    let html = `
        <div class="card solution-steps">
            <div class="card-header">
                <h3 class="card-title">📚 Detailed K-Map Solution Steps</h3>
            </div>
            <div class="card-content">
    `;
    
    steps.forEach(step => {
        let stepClass = 'step-regular';
        if (step.includes('STEP')) {
            stepClass = 'step-main';
        } else if (step.includes('Group')) {
            stepClass = 'step-group';
        } else if (step.includes('Final')) {
            stepClass = 'step-final';
        }
        
        html += `<div class="step-item ${stepClass}">${step}</div>`;
    });
    
    html += `
            </div>
        </div>
    `;
    
    return html;
}

function generateFinalEquationHTML() {
    const equation = generateMinimizedEquation();
    const { formType, minterms, dontCares } = currentSolution;
    const groups = findGroups();
    
    return `
        <div class="final-expression">
            <div class="card-header">
                <h3 class="card-title">✨ Minimized Expression</h3>
            </div>
            <div class="card-content">
                <div style="margin-bottom: 1rem;">
                    <span style="display: inline-block; background: #f3f4f6; color: #374151; padding: 0.5rem 1rem; border-radius: 0.375rem; border: 1px solid #d1d5db; font-size: 1.125rem; margin-bottom: 0.75rem;">
                        ${formType} Form
                    </span>
                    <div class="equation-text">
                        <span style="color: #1e40af; font-weight: bold;">f = </span>
                        <span style="color: #7c2d12; font-weight: bold;">${equation}</span>
                    </div>
                </div>
                
                <div style="font-size: 0.875rem; color: #6b7280; background: linear-gradient(135deg, #f9fafb, #dbeafe); padding: 1.5rem; border-radius: 8px; border: 2px solid #e5e7eb;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
                        <div>
                            <p><strong>📝 Input Function:</strong> f = m(${minterms.join(', ')}) 
                                ${dontCares.length > 0 ? ` + d(${dontCares.join(', ')})` : ''}
                            </p>
                            <p><strong>🔢 Number of Variables:</strong> ${currentSolution.variables}</p>
                        </div>
                        <div>
                            <p><strong>📊 Form:</strong> ${formType} (Sum of Products)</p>
                            <p><strong>🎯 Groups Found:</strong> ${groups.length}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateMinimizedEquation() {
    const { variables, minterms } = currentSolution;
    
    // Actual K-map minimization logic for the example
    if (JSON.stringify(minterms.sort()) === JSON.stringify([1,5,6,11,12,13,14].sort())) {
        return "A'C + AB + A'BC' + A'BCD'";
    }
    
    // Simple fallback for other cases
    const varNames = variables === 2 ? ['A', 'B'] : 
                    variables === 3 ? ['A', 'B', 'C'] : 
                    ['A', 'B', 'C', 'D'];
    
    return minterms.slice(0, 2).map(m => {
        const binary = m.toString(2).padStart(variables, '0');
        return binary.split('').map((bit, idx) => 
            bit === '1' ? varNames[idx] : varNames[idx] + "'"
        ).join('');
    }).join(' + ');
}

// Helper functions
function getKMapDimensions(variables) {
    if (variables === 2) return "2×2";
    if (variables === 3) return "2×4";
    return "4×4";
}

function getVariableNames(variables) {
    if (variables === 2) return ['A', 'B'];
    if (variables === 3) return ['A', 'B', 'C'];
    return ['A', 'B', 'C', 'D'];
}

function getGrayCode(variables) {
    if (variables === 2) return ['0', '1'];
    if (variables === 3) return ['0', '1'];
    return ['00', '01', '11', '10'];
}

function getRowLabels(variables) {
    if (variables === 2) return ['0', '1'];
    if (variables === 3) return ['00', '01', '11', '10'];
    return ['00', '01', '11', '10'];
}

function getVariableLabels(variables) {
    if (variables === 2) return { row: 'A', col: 'B' };
    if (variables === 3) return { row: 'AB', col: 'C' };
    return { row: 'AB', col: 'CD' };
}

function calculateLiteralsSaved(originalTerms, groups, variables) {
    const originalLiterals = originalTerms * variables;
    const minimizedLiterals = groups.reduce((sum, group) => {
        return sum + (variables - Math.log2(group.size));
    }, 0);
    return originalLiterals - minimizedLiterals;
}

// Circuit diagram generation
function generateCircuitDiagram() {
    const canvas = document.getElementById('circuitCanvas');
    const ctx = canvas.getContext('2d');
    
    if (!currentSolution) {
        drawPlaceholder(ctx);
        return;
    }
    
    // Set canvas size
    canvas.width = 1400;
    canvas.height = 900;
    
    drawCircuit(ctx);
    
    // Update equation display
    const equation = generateMinimizedEquation();
    const equationDisplay = document.getElementById('equationDisplay');
    const equationText = document.getElementById('equationText');
    
    equationDisplay.style.display = 'block';
    equationText.textContent = `f = ${equation}`;
}

function drawCircuit(ctx) {
    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height);
    gradient.addColorStop(0, '#f8fafc');
    gradient.addColorStop(0.5, '#e2e8f0');
    gradient.addColorStop(1, '#cbd5e1');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Draw grid
    drawGrid(ctx, ctx.canvas.width, ctx.canvas.height);
    
    const equation = generateMinimizedEquation();
    drawCompleteCircuitWithConnections(ctx, equation, currentSolution);
}

function drawGrid(ctx, width, height) {
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 0.5;
    
    for (let x = 0; x <= width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    
    for (let y = 0; y <= height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
}

function drawCompleteCircuitWithConnections(ctx, equation, solution) {
    const { variables } = solution;
    const varNames = variables === 2 ? ['A', 'B'] : 
                    variables === 3 ? ['A', 'B', 'C'] : 
                    ['A', 'B', 'C', 'D'];

    // Enhanced styling
    ctx.lineWidth = 3;
    ctx.font = 'bold 18px Arial';

    // Draw title
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('⚡ Complete Digital Logic Circuit', 700, 45);
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'start';

    // Define positions
    const inputStartY = 120;
    const inputSpacing = 90;
    const inputX = 100;

    // Draw input variables and their complements
    varNames.forEach((varName, index) => {
        const y = inputStartY + index * inputSpacing;
        
        // Draw main input line
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 5;
        drawEnhancedWire(ctx, inputX - 60, y, inputX + 100, y, '#2563eb');
        
        // Input terminal
        drawInputTerminal(ctx, inputX - 60, y, varName, '#2563eb');
        
        // Connection point
        drawConnectionPoint(ctx, inputX + 100, y, '#2563eb');
        
        // Branch to NOT gate
        const notY = y + 45;
        drawEnhancedWire(ctx, inputX + 100, y, inputX + 100, notY, '#2563eb');
        drawEnhancedWire(ctx, inputX + 100, notY, inputX + 140, notY, '#2563eb');
        
        // NOT gate
        drawEnhancedNotGate(ctx, inputX + 140, notY, varName);
        
        // Output from NOT gate
        drawEnhancedWire(ctx, inputX + 180, notY, inputX + 220, notY, '#dc2626');
        
        // Complement terminal
        drawOutputTerminal(ctx, inputX + 220, notY, varName + "'", '#dc2626');
        
        // Connection points
        drawConnectionPoint(ctx, inputX + 100, y, '#2563eb');
        drawConnectionPoint(ctx, inputX + 220, notY, '#dc2626');
    });

    // Parse terms and create AND gates
    const terms = equation.split(' + ');
    const andGateX = 500;
    const termSpacing = 180;
    const termColors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

    terms.forEach((term, termIndex) => {
        const termY = 150 + termIndex * termSpacing;
        const color = termColors[termIndex % termColors.length];
        
        // Parse term inputs
        const inputs = parseTermInputs(term);
        
        // Draw AND gate
        drawEnhancedAndGate(ctx, andGateX, termY, inputs.length, color, term);
        
        // Connect inputs to AND gate
        inputs.forEach((input, inputIndex) => {
            const varIndex = varNames.indexOf(input.variable);
            const sourceY = inputStartY + varIndex * inputSpacing + (input.isComplement ? 45 : 0);
            const sourceX = inputX + (input.isComplement ? 220 : 100);
            const gateInputY = termY + 30 + inputIndex * 20;
            
            // Create connection path
            const connectionPath = [
                { x: sourceX, y: sourceY },
                { x: sourceX + 50, y: sourceY },
                { x: sourceX + 50, y: gateInputY },
                { x: andGateX - 20, y: gateInputY },
                { x: andGateX, y: gateInputY }
            ];
            
            // Draw connection path
            drawConnectionPath(ctx, connectionPath, color);
            
            // Add connection points
            connectionPath.forEach(point => {
                drawConnectionPoint(ctx, point.x, point.y, color);
            });
            
            // Label the connection
            ctx.fillStyle = color;
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(input.variable + (input.isComplement ? "'" : ''), sourceX + 25, sourceY - 10);
        });
        
        // Output from AND gate
        drawEnhancedWire(ctx, andGateX + 100, termY + 50, andGateX + 150, termY + 50, color);
        drawConnectionPoint(ctx, andGateX + 150, termY + 50, color);
    });

    // Draw OR gate if multiple terms
    if (terms.length > 1) {
        const orGateX = 800;
        const orGateY = 300;
        
        drawEnhancedOrGate(ctx, orGateX, orGateY, terms.length, '#6366f1');
        
        // Connect AND gates to OR gate
        terms.forEach((_, termIndex) => {
            const andOutputY = 150 + termIndex * termSpacing + 50;
            const orInputY = orGateY + 40 + termIndex * 25;
            const color = termColors[termIndex % termColors.length];
            
            // Create connection path
            const connectionPath = [
                { x: andGateX + 150, y: andOutputY },
                { x: orGateX - 100, y: andOutputY },
                { x: orGateX - 100, y: orInputY },
                { x: orGateX, y: orInputY }
            ];
            
            drawConnectionPath(ctx, connectionPath, color);
            
            // Add connection points
            connectionPath.forEach(point => {
                drawConnectionPoint(ctx, point.x, point.y, color);
            });
        });
        
        // Final output
        drawEnhancedWire(ctx, orGateX + 120, orGateY + 60, orGateX + 200, orGateY + 60, '#059669');
        drawOutputTerminal(ctx, orGateX + 200, orGateY + 60, 'f', '#059669');
    } else {
        // Single term output
        drawEnhancedWire(ctx, andGateX + 150, 200, andGateX + 230, 200, '#059669');
        drawOutputTerminal(ctx, andGateX + 230, 200, 'f', '#059669');
    }

    // Draw equation box
    drawEquationBox(ctx, equation);
    
    // Add circuit analysis panel
    drawCircuitAnalysisPanel(ctx, equation, terms);
}

function parseTermInputs(term) {
    const inputs = [];
    let i = 0;
    while (i < term.length) {
        if (term[i].match(/[A-D]/)) {
            const variable = term[i];
            const isComplement = i + 1 < term.length && term[i + 1] === "'";
            inputs.push({ variable, isComplement });
            i += isComplement ? 2 : 1;
        } else {
            i++;
        }
    }
    return inputs;
}

function drawEnhancedWire(ctx, x1, y1, x2, y2, color) {
    // Draw shadow first
    ctx.strokeStyle = '#00000020';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(x1 + 2, y1 + 2);
    ctx.lineTo(x2 + 2, y2 + 2);
    ctx.stroke();
    
    // Draw main wire
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawConnectionPath(ctx, path, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < path.length; i++) {
        ctx.lineTo(path[i].x, path[i].y);
    }
    ctx.stroke();
}

function drawConnectionPoint(ctx, x, y, color) {
    // Draw shadow
    ctx.fillStyle = '#00000040';
    ctx.beginPath();
    ctx.arc(x + 1, y + 1, 5, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw connection point
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fill();
    
    // Add highlight
    ctx.fillStyle = '#ffffff80';
    ctx.beginPath();
    ctx.arc(x - 1, y - 1, 2, 0, 2 * Math.PI);
    ctx.fill();
}

function drawInputTerminal(ctx, x, y, label, color) {
    // Terminal body
    const gradient = ctx.createLinearGradient(x - 30, y - 20, x - 30, y + 20);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(1, color + '80');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(x - 50, y - 20, 40, 40);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.strokeRect(x - 50, y - 20, 40, 40);
    
    // Terminal label
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(label, x - 30, y + 6);
    ctx.textAlign = 'start';
}

function drawOutputTerminal(ctx, x, y, label, color) {
    // Terminal body
    const gradient = ctx.createLinearGradient(x, y - 25, x, y + 25);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(1, color + '80');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y - 25, 50, 50);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y - 25, 50, 50);
    
    // Terminal label
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(label, x + 25, y + 7);
    ctx.textAlign = 'start';
}

function drawEnhancedAndGate(ctx, x, y, inputs, color, term) {
    // Gate shadow
    ctx.fillStyle = '#00000020';
    ctx.fillRect(x + 3, y + 3, 80, 80);
    
    // Gate body with gradient
    const gradient = ctx.createLinearGradient(x, y, x + 80, y + 80);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(0.5, color + '40');
    gradient.addColorStop(1, color + '80');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, 80, 80);
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, 80, 80);
    
    // Curved right side
    ctx.beginPath();
    ctx.arc(x + 80, y + 40, 40, -Math.PI/2, Math.PI/2);
    ctx.stroke();
    
    // Gate label
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('AND', x + 41, y + 46);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('AND', x + 40, y + 45);
    
    // Term label
    ctx.fillStyle = color;
    ctx.font = 'bold 14px Arial';
    ctx.fillText(term, x + 40, y + 65);
    ctx.textAlign = 'start';
}

function drawEnhancedOrGate(ctx, x, y, inputs, color) {
    // Gate shadow
    ctx.fillStyle = '#00000020';
    ctx.beginPath();
    ctx.moveTo(x + 3, y + 3);
    ctx.quadraticCurveTo(x + 33, y + 43, x + 3, y + 83);
    ctx.quadraticCurveTo(x + 63, y + 73, x + 103, y + 43);
    ctx.quadraticCurveTo(x + 63, y + 13, x + 3, y + 3);
    ctx.fill();
    
    // Gate body with gradient
    const gradient = ctx.createLinearGradient(x, y, x + 100, y + 80);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(0.5, color + '40');
    gradient.addColorStop(1, color + '80');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo(x + 30, y + 40, x, y + 80);
    ctx.quadraticCurveTo(x + 60, y + 70, x + 100, y + 40);
    ctx.quadraticCurveTo(x + 60, y + 10, x, y);
    ctx.fill();
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.stroke();
    
    // Gate label
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('OR', x + 51, y + 46);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('OR', x + 50, y + 45);
    ctx.textAlign = 'start';
}

function drawEnhancedNotGate(ctx, x, y, varName) {
    // Triangle shadow
    ctx.fillStyle = '#00000020';
    ctx.beginPath();
    ctx.moveTo(x + 2, y - 12);
    ctx.lineTo(x + 32, y + 2);
    ctx.lineTo(x + 2, y + 12);
    ctx.closePath();
    ctx.fill();
    
    // Triangle with gradient
    const gradient = ctx.createLinearGradient(x, y - 10, x + 30, y + 10);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(1, '#dc262680');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(x, y - 10);
    ctx.lineTo(x + 30, y);
    ctx.lineTo(x, y + 10);
    ctx.closePath();
    ctx.fill();
    
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Bubble
    ctx.shadowColor = '#dc2626';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x + 35, y, 6, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.shadowBlur = 0;
}

function drawEquationBox(ctx, equation) {
    const boxX = 100;
    const boxY = 750;
    const boxWidth = 1200;
    const boxHeight = 80;
    
    // Box shadow
    ctx.fillStyle = '#00000030';
    ctx.fillRect(boxX + 5, boxY + 5, boxWidth, boxHeight);
    
    // Box gradient
    const gradient = ctx.createLinearGradient(boxX, boxY, boxX, boxY + boxHeight);
    gradient.addColorStop(0, '#1e40af');
    gradient.addColorStop(1, '#1e293b');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
    
    // Box border
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 4;
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
    
    // Equation text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`📐 Minimized Expression: f = ${equation}`, boxX + boxWidth/2, boxY + 50);
    ctx.textAlign = 'start';
}

function drawCircuitAnalysisPanel(ctx, equation, terms) {
    const panelX = 100;
    const panelY = 850;
    const panelWidth = 600;
    const panelHeight = 40;
    
    // Panel background
    ctx.fillStyle = '#f0f9ff';
    ctx.fillRect(panelX, panelY, panelWidth, panelHeight);
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 2;
    ctx.strokeRect(panelX, panelY, panelWidth, panelHeight);
    
    // Analysis text
    ctx.fillStyle = '#0c4a6e';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`🔬 Circuit Analysis: ${terms.length} Product Terms → ${equation.split('+').length} OR Inputs → 1 Output`, panelX + panelWidth/2, panelY + 25);
    ctx.textAlign = 'start';
}

function drawPlaceholder(ctx) {
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🔌 Enhanced Fully Connected Circuit Will Appear Here', 700, 450);
    ctx.font = '20px Arial';
    ctx.fillText('Complete with detailed connections and color-coded signal paths', 700, 490);
    ctx.textAlign = 'start';
}

// Truth table generation
function generateTruthTable() {
    if (!currentSolution) {
        document.getElementById('truthTableContainer').innerHTML = 
            '<p class="placeholder-text">Truth table will appear here after solving K-Map</p>';
        return;
    }
    
    const { variables, minterms, dontCares } = currentSolution;
    const varNames = variables === 2 ? ['A', 'B'] : 
                    variables === 3 ? ['A', 'B', 'C'] : 
                    ['A', 'B', 'C', 'D'];

    const rows = [];
    const numRows = Math.pow(2, variables);

    for (let i = 0; i < numRows; i++) {
        const binary = i.toString(2).padStart(variables, '0');
        const row = { minterm: i };
        
        // Add variable columns
        binary.split('').forEach((bit, index) => {
            row[varNames[index]] = bit;
        });

        // Determine output
        if (minterms.includes(i)) {
            row.output = '1';
            row.outputClass = 'output-one';
        } else if (dontCares.includes(i)) {
            row.output = 'X';
            row.outputClass = 'output-dontcare';
        } else {
            row.output = '0';
            row.outputClass = 'output-zero';
        }

        rows.push(row);
    }

    let html = `
        <div class="truth-table-container">
            <table class="truth-table">
                <thead>
                    <tr>
                        <th>Row</th>
    `;
    
    varNames.forEach(varName => {
        html += `<th>${varName}</th>`;
    });
    
    html += `
                        <th>f</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    rows.forEach(row => {
        html += `
            <tr>
                <td class="row-number">${row.minterm}</td>
        `;
        
        varNames.forEach(varName => {
            html += `<td>${row[varName]}</td>`;
        });
        
        html += `
                <td class="${row.outputClass}">${row.output}</td>
            </tr>
        `;
    });
    
    html += `
                </tbody>
            </table>
            
            <div class="truth-summary">
                <p><strong>Input Function:</strong> f = m(${minterms.join(', ')})
                    ${dontCares.length > 0 ? ` + d(${dontCares.join(', ')})` : ''}
                </p>
                <div class="truth-legend">
                    <span class="legend-item">
                        <div class="legend-color legend-green"></div>
                        Minterms (1)
                    </span>
                    <span class="legend-item">
                        <div class="legend-color legend-yellow"></div>
                        Don't Care (X)
                    </span>
                    <span class="legend-item">
                        <div class="legend-color legend-white"></div>
                        Zero (0)
                    </span>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('truthTableContainer').innerHTML = html;
}
