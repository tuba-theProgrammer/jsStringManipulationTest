function findCombinationsFromText(input) {
  // Define the hierarchy order
  const hierarchy = ['Group', 'Category', 'Subcategory', 'Make', 'Model', 'Diagram'];

  // Sanitize the input: remove special characters between tags, not inside tag values
  input = input.replace(/[^a-zA-Z0-9\-_, ]+/g, ''); // Remove special chars except valid ones for values

  // Create a regex pattern to split the input based on hierarchy words
  const splitPattern = new RegExp(`(${hierarchy.join('|')})_`, 'g');

  // Split the input and clean the tags
  const tags = input.split(splitPattern)
    .filter(Boolean) // Remove empty strings
    .reduce((acc, curr, index, array) => {
      if (hierarchy.includes(curr)) {
        let value = array[index + 1]
          ?.split(/(?=[A-Z][a-z]+_)/)[0] // Split at the next potential prefix
          .replace(/[^a-zA-Z0-9\-_]/g, '') // Clean value, remove special characters
          .replace(/^[-]+|[-]+$/g, '')   // Trim leading and trailing hyphens
          .replace(/--+/g, '-'); // Replace multiple hyphens with a single hyphen

        // Check for invalid values
        if (!value || !/^[a-zA-Z0-9\-]+$/.test(value)) {
          return acc; // Skip invalid values
        }

        acc.push({ prefix: curr, value });
      }
      return acc;
    }, []);

  // Check for invalid prefixes
  const allPrefixes = input.match(/(\w+)_/g) || [];
  if (allPrefixes.some(prefix => !hierarchy.includes(prefix.slice(0, -1)))) {
    return []; // Return empty array if there are invalid prefixes
  }

  // Check for duplicate prefixes
  const prefixCounts = tags.reduce((counts, tag) => {
    counts[tag.prefix] = (counts[tag.prefix] || 0) + 1;
    return counts;
  }, {});

  if (Object.values(prefixCounts).some(count => count > 1)) {
    return []; // Return empty array if there are duplicate prefixes
  }

  // Sort tags based on hierarchy
  tags.sort((a, b) => hierarchy.indexOf(a.prefix) - hierarchy.indexOf(b.prefix));

  // Generate combinations
  const combinations = [];
  for (let i = tags.length; i > 0; i--) {
    combinations.push(tags.slice(0, i).map(tag => `${tag.prefix}_${tag.value}`));
  }

  return combinations;
}



// Test cases
console.log("Group_Electric-Pallet-Jack-Parts, Category_Switches, Subcategory_Ignition-Switch")
console.log("Case 3", findCombinationsFromText("Group_Electric-Pallet-Jack-Parts, Category_Switches, Subcategory_Ignition-Switch"));
console.log("--Group_Electric-Pallet-Jack-Parts, Category_Switche@%s-!!Subcategory_Ignition-Switch))@!%")
console.log("Case 4", findCombinationsFromText("--Group_Electric-Pallet-Jack-Parts, Category_Switche@%s-!!Subcategory_Ignition-Switch))@!%"));
console.log("Category_Switches-Group_Electric-Pallet-Jack-Parts-Subcategory_Ignition-Switch")
console.log("Case 5", findCombinationsFromText("Category_Switches-Group_Electric-Pallet-Jack-Parts-Subcategory_Ignition-Switch"));
console.log("Group_Tools-Hardware-Category_Roll-Pin-Make_Atlas")
console.log("Case 6", findCombinationsFromText("Group_Tools-Hardware-Category_Roll-Pin-Make_Atlas"));
console.log("Group_Tools-Hardware-Category_Roll-Pin-Make_Atlas-Group_Test")
console.log("Case 7", findCombinationsFromText("Group_Tools-Hardware-Category_Roll-Pin-Make_Atlas-Group_Test"));
console.log("Group_Tools-Hardware-Category_Roll-Pin-Make_Atlas-WrongPrefix_Test")
console.log("Case 8", findCombinationsFromText("Group_Tools-Hardware-Category_Roll-Pin-Make_Atlas-WrongPrefix_Test"));
console.log('Group_Tools-Hardware-Category_Roll-Pin-Make_U-Line-Model_H-1193')
console.log("Case 9", findCombinationsFromText('Group_Tools-Hardware-Category_Roll-Pin-Make_U-Line-Model_H-1193'))
console.log('Group_Tools-Hardware-Category_Roll-Pin-Make_Multiton-Model_J')
console.log("Case 10", findCombinationsFromText('Group_Tools-Hardware-Category_Roll-Pin-Make_Multiton-Model_J'))
console.log('Make_Atlas-Model_Zenith-Type9-Diagram_Frame')
console.log("Case 11", findCombinationsFromText('Make_Atlas-Model_Zenith-Type9-Diagram_Frame'))
console.log('Group_Tools-&-Hardware')
console.log("Case 12", findCombinationsFromText('Group_Tools-&-Hardware'))
console.log('Group_Electric-Pallet-Jack-Parts-Category_Battery-Subcategory_Battery-Charger-Make_Hyster-Model_B218N26949L-UP')
console.log("Case 13", findCombinationsFromText('Group_Electric-Pallet-Jack-Parts-Category_Battery-Subcategory_Battery-Charger-Make_Hyster-Model_B218N26949L-UP'))
console.log('Group_Electric-Pallet-Jack-Parts-Category_Electric-Pallet-Jack-Lift-Parts-Subcategory_Yoke')
console.log("Case 14", findCombinationsFromText('Group_Electric-Pallet-Jack-Parts-Category_Electric-Pallet-Jack-Lift-Parts-Subcategory_Yoke'))
console.log('Group_Industrial-Seal-Kits-Make_Yutani')
console.log("Case 15", findCombinationsFromText('Group_Industrial-Seal-Kits-Make_Yutani'))
console.log('Make_Atlas-Model_Zenith-Type9')
console.log("Case 16", findCombinationsFromText('Make_Atlas-Model_Zenith-Type9'))
console.log('Group_Wheel-Bearings-Category_Bearing-Wiper')
console.log("Case 17", findCombinationsFromText('Group_Wheel-Bearings-Category_Bearing-Wiper'))

console.log("Case 18 ", findCombinationsFromText('Make#$(&^_Lift-Rite-Group_Tool!@%s-Hardware-Category_Washer-!@#%'));
