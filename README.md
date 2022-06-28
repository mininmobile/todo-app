# todo-app
This is an example todo app made with;

* react
* react-router
* redux
* redux toolkit
* typescript

## time taken

|          | 06/22 | 06/23 | 06/24 | 06/25 | 06/26 | 06/27 | 06/28 |
|----------|-------|-------|-------|-------|-------|-------|-------|
| research | ~2hrs | ~2hrs | ~30m  |       |       |       |       |
| sprint 1 |       | 2h22m | 2h39m | 1h18m | 1h46m | 2h12m |       |
| sprint 2 |       |       |   53m | 2h18m | 2h13m | 4h03m |       |
| sprint 3 |       |       |       |       | 1h25m | 3h55m |       |
| document |       |       |       |       |       |       | 3h00m |
| total    | ~4:00 | ~4:22 | ~4:01 |  3:36 |  5:24 | 10:10 |  3:00 |

**total of all days** ≈ 33 hours 33 minutes

* **research** consisted of relearning react (it's been a while) as well as getting to grips with redux and typescript
* **sprint**s are amounts of times i spent actively developing the project
* **document**ation is the amount of time i spent writing this readme and documenting the code

## set up
```sh
# clone repo
git clone https://github.com/mininmobile/todo-app
cd todo-app

# install database server
npm i -g json-server

# create database
echo '{ "notes": [], "tags": [] }' > db.json

# install dependencies
npm i
```

## running
open two terminals, one for `json-server -p 3001 db.json` and one for `npm start`

# screenshots
> if the gifs look particularily choppy to you it is because i have smooth scrolling disabled in firefox, i find it distracting

## creating/editing notes
![](https://raw.githubusercontent.com/mininmobile/todo-app/master/docs/note-view.gif)

## searching notes
![](https://raw.githubusercontent.com/mininmobile/todo-app/master/docs/note-search.gif)

## managing tags
![](https://raw.githubusercontent.com/mininmobile/todo-app/master/docs/tag-view.gif)

# bonus
## documentation
documentation is provided via. this document and throughout the source code.

## design, animations, and ux considerations
i followed the mockup pretty closely, but deviated from it where necessary. animations are kept minimal to enhance the user experience without being distracting. there have also been some other ux considerations which i feel are significant enough to list here;

- forms can be submit via ctrl+enter
- instead of opening the edit dialog on click, it can be accessed via the action button to allow the user to, for example, search for a previous note while creating a new one and select text from it to paste.
- the container has extra margin on the bottom to provide a more comfortable viewing experience
- dropdown menus have extra margin on the bottom to allow mobile users to more comfortably scroll it into view if, for instance, one is opened from the bottom-most note
- the search bar widens when it is active (text is entered into it or a sorting mode is selected) revealing a clear button. the clear button A) resets both text and the sort mode if either are active and focuses the search bar, otherwise B) it closes out the search bar
	- on mobile/thin portrait screens, the search bar widens to take up the entire navigation bar

## mobile availability
the css is kept as simple as possible to make the app work on mobile devices without many media queries, there *are* still some present, but mainly just for widening containers and reducing margin/increasing padding and such.

## tags, filtering, and sorting
see the **search** and **tags** sections under **internals**

# interals
## search
search functionality is provided by a `SearchProvider` component in root, which exposes the `src/contexts/SearchContext`'s Provider and attaches a [state, setState] to its value. the object contained by state is henceforth referred to as the search query/search query object/`searchQuery`;

```js
{
	text: "",
	tags: [],
	sort: 0,
}
```

text is a string that will be used to search both the title and description of the notes

tags is a list of tag ids that will be used to show only the notes with all tags in the list

sort defines the sorting mode:

0. no sorting
1. **titles alphabetically** descending (a-z)
2. **titles alphabetically** ascending (z-a)
3. **descriptions alphabetically** descending (a-z)
4. **descriptions alphabetically** ascending (z-a)
5. **tag amount** descending (min-max)
6. **tag amount** ascending (max-min)

## tags
tags are created and edited via the tag manager (available at `/tags` or by clicking "Tags" in the navbar)

they are displayed along the bottom of notes along with an action button which summons a dropdown menu which allows you to add new tags. by clicking the body of one of the tags in the list the tag's id is added to `searchQuery.tags`, by clicking the x button of a tag it is removed from the note.

## dropdown menus
a setState for a menu object is passed down from App to each Note, which they pass to two MenuButtons — one which handles the add new tag menu and one which handles the edit/delete menu. the menu object;

```js
{
	// self explainatory
	open: false,
	// location is sent by the MenuButton
	x: 0,
	y: 0,
	// if `true` will be left-aligned
	righty: false,
	// see below
	menu: [],
}
```

menu defines an array which contains the items of the dropdown menu. it has two possible elements it can contain;
- `[string | JSX.Element, () => void]`
	- string/element to be displayed, which when clicked will execute a function
- `"-"`
	- inserts a divider between dropdown menu items

## dialogs
a Dialog takes an `element` prop, which is usually a "Form". the `element` is passed an `onClose` callback by the Dialog which can be used to close the dialog through, for example, a cancel button as well as clicking out of the dialog which is provided by default.

a "Form" is a component which returns a fragment of elements with `form__*` classes. the only implemented form is `FormNote` (i planned to have another form be used to manage tags but i opted for the TagManager instead)

## components
most other components/functions of interest have jsdoc comments around them in the code

## structure
a list of components deliminated by commas is shorthand for a bunch of elements that contain one another

any component with a `Library/` prefix represents a prebuild component, any without represent custom components.

any components in angle brackets (ie. `<App dialog="new" />`) follows the same rules as above but has notable props, the omitting the `/>` for just `>` means the component has children

### root
- Redux/Provider, SearchProvider, Router/BrowserRouter
	- NavBar
	- `<div .container>`, Router/Routes
		- `/` ⇒ `<App />`
		- `/new` ⇒ `<App />`
			- new note creation functionality is handled by App's NoteBar
		- `/edit` ⇒ `<App dialog="new" />`
			- edit dialog is used to create new note if an id to edit is not provided
		- `/edit/:id` ⇒ `<App dialog="edit" />`
		- `/tags` ⇒ `<TagManager />`
		- `/about` ⇒ `<About />`
			- simple about page
		- `/*` ⇒ `<InvalidPage />`
			- simple 404 page

### App
the following is wrapped in a React/Fragment

- NoteBar
- TagSearchbar
	- a 'searchbar' that appears only when the search query includes tags
	- allows user to clear `searchQuery.tags`, or remove individual tags from it
- `notes.map(note => <NoteCard ... />)`
- `<div .note-search-info />`
	- displays a count of the notes excluded by the search criteria
	- only shown if `searchQuery.title.length > 0` or `searchQuery.tags.length > 0`
- MenuDropdown
	- only shown if `menu.open`
- Dialog
	- element=`<FormNote type={dialog} />`
	- only shown if the `dialog` props of App is set

### TagManager
the following is wrapped in a React/Fragment

- a `<h1>` and some `<p>`s explaining the tag manager
- `<TagListItem isBar={true}/>`
	- the header for the table displayed in the tag manager
	- allows creating new tags with the components used to edit regular TagListItems
- `tags.map(tag => <TagListItem />)`
