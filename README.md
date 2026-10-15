# Management Mission: The Leadership Escape

A responsive, browser-only educational game for introductory management students. It uses a four-room escape mission to practise the four core management functions: planning, organizing, leading, and controlling.

## Assumptions used

- **Subject/topic:** Management — the four core management functions.
- **Student level:** Introductory / diploma-level students.
- **Learning outcome:** Identify and apply planning, organizing, leading, and controlling to workplace situations.
- **Question count:** 12 multiple-choice challenges.
- **Language:** English.
- **Game type:** Escape-room mission.
- **Duration:** Untimed by default. There are no speed bonuses; the score measures first-attempt understanding.

## Files

- `index.html` — page structure and screens.
- `style.css` — responsive layout and visual design.
- `script.js` — gameplay, score/progress logic, explanations, and editable question bank.

No build step, backend, API key, or external assets are required. A web font is requested from Google Fonts; if unavailable, the page falls back to system fonts.

## Test locally

1. Download and extract the ZIP.
2. Open `index.html` in a modern browser.
3. Select **Start mission**, then **Enter Management HQ**.
4. Test a correct answer, an incorrect answer followed by a correct answer, Continue, completion, Play again, Home, and Restart.
5. Resize the browser or test on a phone-sized viewport.

For a local HTTP preview, you may use any simple static server, but it is not required.

## Publish with GitHub Pages

1. Create a new repository on GitHub, for example `management-mission`.
2. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the **root** of the repository (not inside an extra nested folder).
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose the `main` branch and `/(root)` folder, then save.
6. Wait for GitHub Pages to publish. The site URL appears in the Pages settings. It usually looks like `https://YOUR-USERNAME.github.io/management-mission/`.

## Edit the question bank

Open `script.js` and edit the `QUESTION_BANK` array near the top. Each question follows this format:

```js
{
  room: 0, // 0=Planning, 1=Organizing, 2=Leading, 3=Controlling
  roomName: "Planning Lab",
  icon: "📋",
  scenario: "A workplace situation...",
  question: "What should the manager do?",
  options: ["Option A", "Option B", "Option C", "Option D"],
  answer: 0, // correct option index: 0=A, 1=B, 2=C, 3=D
  explanation: "Explain why the correct answer is best."
}
```

Keep `answer` as a zero-based number and make sure it matches the correct option. The last question is intentionally a new example that checks transfer of understanding; keep a final transfer question last when changing the bank. If you change the number of questions, the game updates the progress and score automatically. Keep at least one question for each room for a balanced mission.

## Manual test checklist

- [ ] Start button opens the briefing.
- [ ] Enter button starts the game.
- [ ] Answer choices are selectable by mouse, touch, and keyboard.
- [ ] Correct answers award one knowledge point only.
- [ ] Incorrect answers show feedback and allow another attempt.
- [ ] A question cannot be scored twice by repeated clicks.
- [ ] Continue appears after a correct answer and advances the mission.
- [ ] Progress, room map, and key count update.
- [ ] Final report displays score, completed challenges, and explanations.
- [ ] Play again resets the mission and score.
- [ ] Home and Restart controls work.
- [ ] Layout remains usable on desktop and mobile screens.
