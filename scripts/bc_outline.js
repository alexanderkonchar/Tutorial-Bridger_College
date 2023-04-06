"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 12
   Tutorial Case

   Author: Alex Konchar
   Date: 2023-04-04

   Filename: bc_outline.js


   Function List
   =============

   makeOutline()
      Generates the text of the table of contents
      as a nested list

   createList(source, TOCList, headings)
      Creates an outline based on the source document,
      list items are appended to TOCList,
      the list items are based on the element names
      specified in the headings array


*/

// Generate an outline based on h1 through h6 headings in the source document
window.addEventListener('load', makeOutline);

function makeOutline() {
    // Location of the document outline
    const outline = document.getElementById("outline");

    // Source document for the outline
    const source = document.getElementById("doc");

    const mainHeading = document.createElement("h1");
    const outlineList = document.createElement("ol");
    const headingText = document.createTextNode("Outline");

    mainHeading.appendChild(headingText);
    outline.appendChild(mainHeading);
    outline.appendChild(outlineList);

    createList(source, outlineList);
}

function createList(source, outlineList) {
    // Headings for the outline
    const headings = ["H1", "H2", "H3", "H4", "H5", "H6"];

    // Previous level of the headings
    let prevLevel = 0;

    // Running total of the article headings
    let headNum = 0;

    // Loop through all the child nodes of source article until no child nodes are left
    for (let n = source.firstChild; n != null; n = n.nextSibling) {
        // Examine only article headings
        const headLevel = headings.indexOf(n.nodeName);

        if (headLevel !== -1) {
            // Add an id to the heading if it is missing
            headNum++;
            if (n.hasAttribute("id") === false) {
                n.setAttribute("id", "head" + headNum);
            }
            
            const listElem = document.createElement("li");

            // Create hypertext links to the document headings
            const linkElem = document.createElement("a");
            linkElem.innerHTML = n.innerHTML;
            linkElem.setAttribute("href", "#" + n.id);
            
            // Append the hyperlink to the list item
            listElem.appendChild(linkElem);

            if (headLevel === prevLevel) {
                // Append the list item to the current list
                outlineList.appendChild(listElem);
            } else if (headLevel > prevLevel) {
                // Start a new nested list
                const nestedList = document.createElement("ol");
                nestedList.appendChild(listElem);
                // Append nestedList to last item in the current list
                outlineList.lastChild.appendChild(nestedList);
                // Change the current list to the nested list
                outlineList = nestedList;
            } else {
                // Append the list item to a higher list
                // Calculate the difference between the current and previous level
                const levelUp = prevLevel - headLevel;
                // Go up to the higher level
                for (let i = 1; i <= levelUp; ++i) {
                    outlineList = outlineList.parentNode.parentNode;
                }
                outlineList.appendChild(listElem);
            }
            // Update the value of prevLevel
            prevLevel = headLevel;
        }
    }
}