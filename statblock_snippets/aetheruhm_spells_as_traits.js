if (monster.casting.type == "innate") {
    monster.casting_desc = `The ${monster.name}'s spellcasting ability is \
    ${monster.casting.ability} (spell save DC ${monster.casting.dc}. \
    The ${monster.name} can innately cast the following spells, requiring no components:`
}

/* Inject minimal styles once */
const ensureStylesInjected = () => {
  const STYLE_ID = 'aetheruhm-spells-styles';
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    /* Each spell row stays on a single line */
    .aether-spell-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0.125rem 0;
    }
    /* Name flexes to fill, uses stay to the right */
    .aether-spell-name {
      flex: 1 1 auto;
      display: inline-block; /* let property-name/trait-name styling apply inline */
    }
    /* Uses area (checkboxes or "At will") stays inline and aligned */
    .aether-spell-uses {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      flex: 0 0 auto;
      line-height: 1;
    }
    .aether-spell-uses input[type="checkbox"] {
      margin: 0;
    }
    .aether-spell-uses .at-will {
      font-style: italic;
    }
  `;
  document.head.appendChild(style);
};

ensureStylesInjected();

const getSpellCheckbox = () => {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("stat-value");
  //checkbox.setAttribute("aria-label", `${spell} use ${index + 1}`);
  // Keep your behavior; you can wire tp or persistence here
  //checkbox.onclick = () => {
  //  console.log(`Toggled: ${spell} [use ${index + 1}]`);
  //};
  return checkbox;
};
monster.getSpellCheckbox = getSpellCheckbox;

const addInnateSpell = (count, tag) => {
  console.log(tag);
  const uses = Number(count) || 0;

  const row = document.createElement("span");
  row.classList.add("aether-spell-row");

  // Uses container: inline checkboxes or "At will"
  const usesEl = document.createElement("span");
  usesEl.classList.add("aether-spell-uses");

  if (uses <= 0) {
    const atWill = document.createElement("span");
    atWill.classList.add("at-will");
    atWill.textContent = "At will";
    usesEl.append(atWill);
  } else {
    for (let i = 0; i < uses; i++) {
      usesEl.append(monster.getSpellCheckbox());
    }
  }

  row.append(usesEl);
  return row;
};
monster.addInnateSpell = addInnateSpell;

