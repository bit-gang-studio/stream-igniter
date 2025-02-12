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
      "One thing I would improve in this game?",
      "Your favourite character in this game?",
      "Your favourite mechanic or rule in this game?",
      "How would you improve this game?",
      "A question for the game devs?",
      "What could this game learn from another game?",
    ],
    "Streamer's personal experiences": [
      "The best thing that's happened to you today",
      "A frustrating moment you've had today",
      "A funny moment you've had today",
      "A sad moment you've had today",
      "A happy moment you've had today",
      "A scary moment you've had today",
      "A triumphant moment you've had today",
      "An awkward moment you've had today",
      "A moment of growth you've had today",
    ],
    "Game/Chat engagement & opinions": [
      "Current thought process in-game right now?",
      "What are you doing in-game right now?",
      "What is your strategy in-game right now?",
      "What are you planning to do next in-game?",
      "What have you learned not to do in this game?",
      "A great strategy you've learned in this game?",
      "Biggest fail in this game this week?",
      "Biggest win in this game this week?",
    ],
    "Game history": [
      "What was your first impression of this game?",
      "How has this game changed in feeling over time?",
      "Tell a frustrating moment you've had with this game",
    ],
    "Game Release": [
      "How do you feel about this games latest update?",
      "Any new games you're exicted about?",
      "Your knowldge on the game dev studio?",
    ],
    "Gaming industry trends": [
      "How is this games genre doing in the industry?",
    ],
    "Personal gaming achievements": [
      "What is your biggest achievement this week?",
    ],
    "Stream setup & behind-the-scenes": [
      "How has your stream setup improved over time?",
      "Any updates planned to your stream setup?",
      "Biggest lesson you've learned from streaming this month?",
      "Your favourite streamer right now?",
    ],
    "Strategies & playstyles": [
      "How has your playstyle changed over time?",
      "What is your strategy in this game?",
    ],
    "Daily challenges & goals": [
      "What is your goal for todays stream/play session?",
      "What are your long-term goals for this game?",
    ],
    "Favorite gaming memories": [
      "What is your favourite memory from this game?",
      "Share a funny story from playing this game with a friend",
    ],
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
