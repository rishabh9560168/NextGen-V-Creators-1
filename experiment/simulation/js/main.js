function evaluateGate() {
  const checkboxes = document.querySelectorAll(".input-bit");
  const inputs = Array.from(checkboxes).map(cb => cb.checked ? 1 : 0);
  const gate = document.getElementById("gate-select").value;

  let result;
  switch (gate) {
    case 'AND': result = inputs.reduce((a, b) => a & b); break;
    case 'OR': result = inputs.reduce((a, b) => a | b); break;
    case 'NAND': result = 1 - inputs.reduce((a, b) => a & b); break;
    case 'NOR': result = 1 - inputs.reduce((a, b) => a | b); break;
    case 'XOR': result = inputs.reduce((a, b) => a ^ b); break;
    case 'XNOR': result = 1 - inputs.reduce((a, b) => a ^ b); break;
    default: result = "Invalid Gate";
  }

  document.getElementById("gate-output").innerText = `Output: ${result}`;
}

function generateTruthTable() {
  let html = '<table border="1"><tr><th>A</th><th>B</th><th>C</th><th>AND</th><th>OR</th><th>XOR</th></tr>';
  for (let i = 0; i < 8; i++) {
    const A = (i >> 2) & 1;
    const B = (i >> 1) & 1;
    const C = i & 1;
    html += `<tr>
      <td>${A}</td><td>${B}</td><td>${C}</td>
      <td>${A & B & C}</td>
      <td>${A | B | C}</td>
      <td>${A ^ B ^ C}</td>
    </tr>`;
  }
  html += '</table>';
  document.getElementById("truth-table").innerHTML = html;
}

function buildExpressions() {
  const minInput = document.getElementById("min-terms").value;
  const maxInput = document.getElementById("max-terms").value;

  const minTerms = minInput.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
  const maxTerms = maxInput.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));

  const getBinary = num => num.toString(2).padStart(3, '0');

  const sop = minTerms.map(term => {
    const bin = getBinary(term);
    return bin.split('').map((b, i) => b === '1' ? String.fromCharCode(65 + i) : `${String.fromCharCode(65 + i)}'`).join('');
  }).join(' + ');

  const pos = maxTerms.map(term => {
    const bin = getBinary(term);
    return `(${bin.split('').map((b, i) => b === '0' ? String.fromCharCode(65 + i) : `${String.fromCharCode(65 + i)}'`).join(' + ')})`;
  }).join(' ');

  document.getElementById("expression-output").innerHTML = `<b>SOP:</b> ${sop}<br/><b>POS:</b> ${pos}`;
}
//Your JavaScript goes in here
