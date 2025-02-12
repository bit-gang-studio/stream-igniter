import { Component } from '@angular/core';

/*
 * 
 * Chat categories:
 * Game mechanics & improvements
 * Streamer's personal experiences
 * Chat engagement & opinions
 * Funny or frustrating moments
 * Upcoming game releases
 * Gaming industry trends
 * Personal gaming achievements
 * Stream setup & behind-the-scenes
 * Strategies & playstyles
 * Daily challenges & goals
 * Favorite gaming memories
 * 
  Give me a simple list of 50 short, direct, and open-ended questions in the category 'xxxxxxxxxxxxxx' that could apply to most video games.
  The questions should be engaging, relevant, and encourage thoughtful or creative responses.
  Do not ask questions that may only pertain to a certain category of games.
  Each must be
  - 8th grade reading level
  - 40 chars max
  - Real-Time Relevance
  - Specificity
  - Conciseness
  - Engagement-Driven
  - Emotionally Evocative
  - Streamer-Centric
 * 
 * 
*/

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  prompts: { [id: string]: Array<string> } = {
    "Game mechanics & improvements": [
      "I would improve this game by..",
      "My favourite in-game character is..",
      "My favourite in-game mechanic is..",
      "I want to ask the game devs..",
      "This game could learn from another game..",
      "Imagine this game, but with..",
    ],
    "Streamer's personal experiences": [
      "The best thing that happened today..",
      "I had a frustrating moment today..",
      "I had a funny moment today..",
      "I had a sad moment today..",
      "I had a happy moment today..",
      "I had a scary moment today..",
      "I had a triumphant moment today..",
      "I had an awkward moment today..",
      "I grew today when I..",
      "Today I learned..",
      "I met someone new today..",
      "I helped someone today..",
      "I was helped today..",
      "I was inspired today by..",
      "A new thing I want to try is..",
      "I am grateful for..",
      "My biggest achievement today was..",
      "A secret I want to share is..",
    ],
    "Game/Chat engagement & opinions": [
      "My in-game thought process currently..",
      "My in-game plan right now is..",
      "My in-game strategy right now is..",
      "Next thing I want to do in-game is..",
      "One thing I need to learn in-game is..",
      "I learned not to do this in-game..",
      "A recent in-game discovery is..",
      "A recent in-game struggle is..",
      "A recent in-game strategy is..",
      "Biggest in-game fail this week..",
      "Biggest in-game win this week..",
      "Why I've been playing this game more/less..",
      "This game is..",
      "I love this game because..",
    ],
    "Game history": [
      "My first impression of this game was..",
      "This game changed over time by..",
      "This game's community is..",
      "This game has a history of..",
      "This game's development was..",
      "This game's story is..",
      "This game's lore is..",
      "One thing I liked when game launched..",
      "One thing I disliked when game launched..",
      "This game has improved by..",
    ],
    "Game Release": [
      "This games latest update is..",
      "This games recent update have been..",
      "I am excited for a new game coming out..",
      "A fact I know about this game is..",
      "A fact I know about the game studio is..",
    ],
    "Gaming industry trends": [
      "This game's genre is currently..",
      "This game's community is currently..",
      "This game's popularity is currently..",
      "This game's future is..",
      "This game's current state is..",
      "This game's current meta is..",
    ],
    "Stream setup & behind-the-scenes": [
      "My stream setup recently improved by..",
      "I plan to update my setup by..",
      "I learned this from streaming..",
      "My favourite streamer is.."
    ],
    "Strategies & playstyles": [
      "My playstyle recently changed by..",
      "My current strategy in this game is.."
    ],
    "Daily challenges & goals": [
      "My in-game goal for today is..",
      "My long-term goal for the game is.."
    ],
    "Favorite gaming memories": [
      "My favourite memory form this game is..",
      "Funny in-game moment with a friend this week..",
    ]
  };


  displayPromptsLength: number = 3;
  displayPrompts: Array<{
    phase: number,
    category: string,
    prompt: string,
  }> = [];

  displayTimer: number = 0;
  displayTime: number = 30 * 1000;
  displayTimerPhase: number = 0;
  displayTimerWidth: number = 0;
  displayTimerInterval: any;

  constructor() {
    this.init();
  }

  async init() {

    // Load the initial prompts (number of prompts = displayPromptsLength)
    for (let i = 0; i < this.displayPromptsLength; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      this.addRandomPrompt();
    }

    // Run timer on an interval every second
    this.displayTimerInterval = setInterval(() => {

      // Update the interval
      this.displayTimer += 1000;
      this.displayTimerWidth = (this.displayTimer / this.displayTime) * 100;
      if (this.displayTimerWidth > 100) this.displayTimerWidth = 100;

      // If we have reached the max time
      if (this.displayTimer > this.displayTime) {

        // Reset the timer
        this.hidePrompt(0);

        // Reset the loading bar
        this.displayTimerPhase = 1;
        setTimeout(() => {
          this.displayTimer = 0;
          this.displayTimerWidth = 0;
          setTimeout(() => {
            this.displayTimerPhase = 0;
          }, 100);
        }, 1000);

      }

    }, 1000);

  }

  async hidePrompt(index: number) {

    // Make the prompt phase 2
    this.displayPrompts[index].phase = 2;

    // wait 500ms
    await new Promise(resolve => setTimeout(resolve, 500));

    // Make the prompt phase 3
    this.displayPrompts[index].phase = 3;

    // Wait 500ms
    await new Promise(resolve => setTimeout(resolve, 500));

    // Remove the prompt from the displayPrompts array
    this.displayPrompts.splice(index, 1);

    // Add a new prompt
    this.addRandomPrompt();

  }

  addRandomPrompt() {

    // Get the categories that have prompts that haven't been displayed yet
    const availableCategories = Object.keys(this.prompts)
      .filter(category =>
        this.prompts[category].some(prompt =>
          !this.displayPrompts.some(dp => dp.prompt === prompt)
        )
      );

    // If there are no new prompts available, log a warning and return
    if (availableCategories.length === 0) {
      console.warn("No new unique prompts available.");
      return;
    }

    // Choose a random category from the available categories
    const randomCategory = availableCategories[Math.floor(Math.random() * availableCategories.length)];
    const availablePrompts = this.prompts[randomCategory].filter(
      prompt => !this.displayPrompts.some(dp => dp.prompt === prompt)
    );

    // If there are no new prompts available, log a warning and return
    if (availablePrompts.length === 0) {
      console.warn(`No new unique prompts available in category: ${randomCategory}`);
      return;
    }

    // Choose a random prompt from the available prompts
    const randomPrompt = availablePrompts[Math.floor(Math.random() * availablePrompts.length)];

    // Create a new prompt object
    let newPrompt = {
      phase: 0,
      category: randomCategory,
      prompt: randomPrompt
    };

    this.displayPrompts.push(newPrompt);

    // in 100 ms set the phase to 1
    setTimeout(() => {
      newPrompt.phase = 1;
    }, 100);

  }

}
