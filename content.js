// Check if personalDetails is already defined
if (typeof personalDetails === 'undefined') {
  var personalDetails = {
    id: "---complete id---", 
    firstName: "---complete first name---",
    lastName: "---complete last name---",
    fullName: "---complete full name---",
    firstNameHebrew: "---complete hebrew first name---",
    lastNameHebrew: "---complete hebrew last name---",
    fullNameHebrew: "---complete hebrew full name---",
    email: "---complete email---",
    phone: "---complete phone number---",
    street: "---complete address---",
    city: "---complete city---",
    country: "---complete country---",
    postalCode: "---complete zip code---",
    state: "---complete state---",
    linkedin: "---complete linkedin url---",
    github: "---complete github url---"
  };
}

// Function to check if any keyword appears in a field's id, name, or placeholder
function fillFieldIfKeywordFound(keywords, hebrewKeywords, englishValue, hebrewValue) {
  const allFields = document.querySelectorAll('input, textarea'); // Get all input and textarea fields

  for (let field of allFields) {
    // Check if the field is already filled
    if (field.value.trim() !== '') {
      continue; // If the field is already filled, skip it and move to the next field
    }

    // Define the attributes we will check, convert all the attributes to lowerCase
    const id = field.id ? field.id.toLowerCase() : ''; 
    const name = field.name ? field.name.toLowerCase() : ''; 
    const placeholder = field.placeholder ? field.placeholder.toLowerCase() : ''; 
    const ariaLabel = field.getAttribute('aria-label') ? field.getAttribute('aria-label').toLowerCase() : ''; 
    const dataAttr = field.getAttribute('data-field') ? field.getAttribute('data-field').toLowerCase() : ''; 
    const title = field.getAttribute('title') ? field.getAttribute('title').toLowerCase() : ''; 
    const className = field.className ? field.className.toLowerCase() : ''; 
    const label = document.querySelector(`label[for="${field.id}"]`); 
    const labelText = label ? label.textContent.toLowerCase() : ''; 
    const autocomplete = field.getAttribute('autocomplete') ? field.getAttribute('autocomplete').toLowerCase() : ''; 

    // Check if any Hebrew keyword matches first
    if (hebrewKeywords.some(keyword => 
      id.includes(keyword) || 
      name.includes(keyword) || 
      placeholder.includes(keyword) ||
      ariaLabel.includes(keyword) || 
      dataAttr.includes(keyword) || 
      title.includes(keyword) ||
      className.includes(keyword) ||
      labelText.includes(keyword) ||
      autocomplete.includes(keyword))) {
      
      // Fill with the Hebrew value if field is for Hebrew name
      field.focus();
      field.value = hebrewValue;
      field.dispatchEvent(new Event('input', { bubbles: true }));
      field.dispatchEvent(new Event('change', { bubbles: true }));
      field.dispatchEvent(new Event('blur', { bubbles: true }));
      return; // Exit once the Hebrew name is filled
    }

    // If no Hebrew match, check English keywords
    if (keywords.some(keyword => 
      id.includes(keyword) || 
      name.includes(keyword) || 
      placeholder.includes(keyword) ||
      ariaLabel.includes(keyword) || 
      dataAttr.includes(keyword) || 
      title.includes(keyword) ||
      className.includes(keyword) ||
      labelText.includes(keyword) ||
      autocomplete.includes(keyword))) {
      
      // Fill with the English value if field is for English name
      field.focus();
      field.value = englishValue;
      field.dispatchEvent(new Event('input', { bubbles: true }));
      field.dispatchEvent(new Event('change', { bubbles: true }));
      field.dispatchEvent(new Event('blur', { bubbles: true }));
      return; // Exit once the English name is filled
    }
  }
}


// Function to simulate typing into a field
function simulateTyping(field, value) {
  field.focus(); // Focus on the field
  field.value = ''; // Clear the field if needed

  // Simulate typing the value character by character
  for (let i = 0; i < value.length; i++) {
    field.value += value[i]; // Add one character at a time
    field.dispatchEvent(new KeyboardEvent('keydown', { key: value[i], bubbles: true }));
    field.dispatchEvent(new KeyboardEvent('keyup', { key: value[i], bubbles: true }));
    field.dispatchEvent(new Event('input', { bubbles: true })); // Dispatch 'input' event after each key
  }

  // Dispatch final change and blur events after all characters are entered
  field.dispatchEvent(new Event('change', { bubbles: true }));
  field.dispatchEvent(new Event('blur', { bubbles: true }));
}

// Keywords for different fields, only declared if they are not already defined
if (typeof firstNameHebrewKeywords === 'undefined') {
  var firstNameHebrewKeywords = ['שם פרטי', 'firstNameHebrew'];
}
if (typeof lastNameHebrewKeywords === 'undefined') {
  var lastNameHebrewKeywords = ['שם משפחה', 'lastNameHebrew'];
}
if (typeof fullNameHebrewKeywords === 'undefined') {
  var fullNameHebrewKeywords = ['שם מלא', 'fullNameHebrew'];
}
if (typeof firstNameKeywords === 'undefined') {
  var firstNameKeywords = ['first', 'fname', 'firstname'];
}
if (typeof lastNameKeywords === 'undefined') {
  var lastNameKeywords = ['last', 'lname', 'lastname'];
}
if (typeof fullNameKeywords === 'undefined') {
  var fullNameKeywords = ['name', 'fullname', 'candidateName'];
}
if (typeof emailKeywords === 'undefined') {
  var emailKeywords = ['email', 'mail'];
}
if (typeof phoneKeywords === 'undefined') {
  var phoneKeywords = ['phone', 'mobile', 'phonecell'];
}
if (typeof streetKeywords === 'undefined') {
  var streetKeywords = ['street'];
}
if (typeof cityKeywords === 'undefined') {
  var cityKeywords = ['city', 'town', 'location'];
}
if (typeof postalCodeKeywords === 'undefined') {
  var postalCodeKeywords = ['postal', 'zip', 'postcode'];
}
if (typeof stateKeywords === 'undefined') {
  var stateKeywords = ['state', 'province', 'region'];
}
if (typeof linkedinKeywords === 'undefined') {
  var linkedinKeywords = ['linkedin', 'linkedin-url'];
}
if (typeof githubKeywords === 'undefined') {
  var githubKeywords = ['github', 'github-url'];
}
if (typeof idKeywords === 'undefined') { 
  var idKeywords = ['id', 'userid', 'user-id', 'identifier', 'מספר תעודת זהות','ת.ז','ID']; 
}
if (typeof countryKeywords === 'undefined') {
  var countryKeywords = ['country'];
}


// Function to fill all fields with personal details
function fillAllFields() {
  // First fill Hebrew names if fields match Hebrew keywords
  fillFieldIfKeywordFound(firstNameKeywords, firstNameHebrewKeywords, personalDetails.firstName, personalDetails.firstNameHebrew);
  fillFieldIfKeywordFound(lastNameKeywords, lastNameHebrewKeywords, personalDetails.lastName, personalDetails.lastNameHebrew);
  
  // If separate fields do not exist for Hebrew, fill the full name fields
  fillFieldIfKeywordFound(fullNameKeywords, fullNameHebrewKeywords, personalDetails.fullName, personalDetails.fullNameHebrew);

  // Fill other fields with personal details
  fillFieldIfKeywordFound(emailKeywords, [], personalDetails.email, ''); 
  fillFieldIfKeywordFound(phoneKeywords, [], personalDetails.phone, ''); 
  fillFieldIfKeywordFound(streetKeywords, [], personalDetails.street, '');
  fillFieldIfKeywordFound(cityKeywords, [], personalDetails.city, '');
  fillFieldIfKeywordFound(countryKeywords, [], personalDetails.country, '');
  fillFieldIfKeywordFound(postalCodeKeywords, [], personalDetails.postalCode, '');
  fillFieldIfKeywordFound(stateKeywords, [], personalDetails.state, '');
  fillFieldIfKeywordFound(linkedinKeywords, [], personalDetails.linkedin, '');
  fillFieldIfKeywordFound(githubKeywords, [], personalDetails.github, '');

  // Handle the ID field specifically
  const idField = document.querySelector('input[name="ID"]'); // Locate the ID field
  if (idField) {
    simulateTyping(idField, personalDetails.id); // Simulate typing for the ID field
  }
}


setTimeout(fillAllFields, 500);  
