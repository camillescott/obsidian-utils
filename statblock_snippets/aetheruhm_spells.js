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

const getSpellCheckbox = (spell, index) => {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("stat-value");
  checkbox.setAttribute("aria-label", `${spell} use ${index + 1}`);
  // Keep your behavior; you can wire tp or persistence here
  checkbox.onclick = () => {
    console.log(`Toggled: ${spell} [use ${index + 1}]`);
  };
  return checkbox;
};

const addInnateSpell = (count, spell) => {
  const uses = Number(count) || 0;

  const row = document.createElement("div");
  row.classList.add("statblock-item", "aether-spell-row");

  // Name: bold + italic via existing CSS classes
  const nameEl = document.createElement("span");
  nameEl.classList.add("property-name", "trait-name", "aether-spell-name");
  nameEl.textContent = `${spell}`;

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
      usesEl.append(getSpellCheckbox(spell, i));
    }
  }

  row.append(nameEl, usesEl);
  return row;
};

const spellsBlock = document.createElement("div");
spellsBlock.classList.add("statblock-item-container",
                          "statblock-traits-container",
                          "statblock-trait-prop",
                          "property");

const blockName = document.createElement("div");
blockName.classList.add("property");
blockName.classList.add("property-name");
blockName.classList.add("trait-name");
blockName.innerText = "Innate Spellcasting";

const blockDesc = document.createElement("div");
blockDesc.classList.add("statblock-markdown");

if (monster.spells_aetheruhm.casting_type == "innate") {
    blockDesc.innerText = `The ${monster.name}'s spellcasting ability is \
    ${monster.spells_aetheruhm.ability} (spell save DC ${monster.spells_aetheruhm.dc}. \
    The ${monster.name} can innately cast the following spells, requiring no components:`
}

spellsBlock.append(blockName);
spellsBlock.append(blockDesc);

/* Sort the keys numerically so "10" doesn't come before "2" */
const entries = Object.entries(monster.spells_aetheruhm.spells)
  .sort((a, b) => Number(a[0]) - Number(b[0]));

for (const [cast_count, group_spells] of entries) {
  for (const spell of group_spells) {
    spellsBlock.append(addInnateSpell(cast_count, spell));
  }
}

return spellsBlock;
