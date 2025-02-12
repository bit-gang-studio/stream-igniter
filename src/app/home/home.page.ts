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
      "My favourite character is..",
      "My favourite mechanic is..",
      "I want to ask the devs..",
      "This game should learn from (other game).."
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
      "I grew today by..",
      "Today I learned..",
    ],
    "Game/Chat engagement & opinions": [
      "My thought process now is..",
      "I am doing this in-game..",
      "My strategy right now is..",
      "I plan to do this next..",
      "I learned not to do this..",
      "I recently learned this strategy..",
      "My biggest fail this week..",
      "My biggest win this week.."
    ],
    "Game history": [
      "My first impression was..",
      "This game changed by..",
      "I had a frustrating moment.."
    ],
    "Game Release": [
      "This games latest update is..",
      "This games recent update have been..",
      "I am excited for a new game coming out..",
      "A fact I know about this game is..",
      "A fact I know about the game studio is..",
    ],
    "Gaming industry trends": [
      "This genre is doing this now.."
    ],
    "Personal gaming achievements": [
      "My biggest achievement was.."
    ],
    "Stream setup & behind-the-scenes": [
      "My stream setup improved by..",
      "I plan to update my setup..",
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
