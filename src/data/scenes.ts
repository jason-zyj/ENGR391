import { Scene } from '../types/game';

export const scenes: Record<string, Scene> = {
  welcome: {
    id: 'welcome',
    act: 0,
    title: 'Welcome to Trust Quest',
    background: 'bg-gradient-to-br from-blue-400 to-purple-500',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'Welcome to Trust Quest! You\'re about to experience a semester at middle school through interactive storytelling.',
      },
      {
        speaker: 'narrator',
        text: 'This game explores themes of peer pressure, stress, and emotional wellbeing. You can take a break anytime by clicking the pause button.',
      },
      {
        speaker: 'narrator',
        text: 'Your choices matter. There are no wrong answers - just different paths and lessons to discover.',
      },
      {
        speaker: 'narrator',
        text: 'First, let\'s create your character!',
      },
    ],
    choices: [
      {
        id: 'create_character',
        text: 'Create My Character',
        nextSceneId: 'character_creation',
        effects: {},
      },
    ],
  },

  character_creation: {
    id: 'character_creation',
    act: 0,
    title: 'Character Creation',
    background: 'bg-gradient-to-br from-indigo-400 to-blue-500',
    dialogue: [],
    choices: [],
  },

  first_day: {
    id: 'first_day',
    act: 1,
    title: 'First Day of the Semester',
    background: 'bg-gradient-to-br from-amber-300 to-orange-400',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'It\'s the first day back after break. The hallways buzz with energy as students reunite with friends.',
      },
      {
        speaker: 'narrator',
        text: 'You spot your best friend Jordan waving at you from across the hall.',
      },
      {
        speaker: 'bestFriend',
        text: 'Hey! Over here! How was your break?',
        emotion: 'happy',
      },
    ],
    choices: [
      {
        id: 'enthusiastic',
        text: 'It was great! Ready for this semester!',
        nextSceneId: 'act1_intro',
        effects: {
          emotion: 'happy',
          relationships: [{ characterId: 'bestFriend', change: 5 }],
        },
      },
      {
        id: 'nervous',
        text: 'Okay... a little nervous about all the work ahead.',
        nextSceneId: 'act1_intro',
        effects: {
          emotion: 'anxious',
          relationships: [{ characterId: 'bestFriend', change: 5 }],
          stats: [{ stat: 'selfRespect', change: 5 }],
        },
      },
    ],
  },

  act1_intro: {
    id: 'act1_intro',
    act: 1,
    title: 'Understanding Yourself',
    background: 'bg-gradient-to-br from-blue-400 to-teal-400',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'Over the next week, you\'ll face different situations that bring up various feelings.',
      },
      {
        speaker: 'narrator',
        text: 'Learning to recognize and name your emotions is the first step to handling them.',
      },
      {
        speaker: 'bestFriend',
        text: 'Want to grab lunch? I heard they\'re doing pizza today!',
        emotion: 'happy',
      },
    ],
    choices: [
      {
        id: 'go_lunch',
        text: 'Sure, let\'s go!',
        nextSceneId: 'lunch_scene',
        effects: {},
      },
    ],
  },

  lunch_scene: {
    id: 'lunch_scene',
    act: 1,
    title: 'Lunchtime',
    background: 'bg-gradient-to-br from-orange-300 to-red-300',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'At lunch, you notice someone sitting alone at a corner table. It\'s Alex, the new student.',
      },
      {
        speaker: 'narrator',
        text: 'Alex is looking down at their phone, occasionally glancing up at the crowded cafeteria.',
      },
      {
        speaker: 'bestFriend',
        text: 'That\'s the new kid. They just transferred here.',
        emotion: 'calm',
      },
    ],
    minigame: 'emotionRecognition',
    choices: [
      {
        id: 'recognize_complete',
        text: 'Continue',
        nextSceneId: 'lunch_choice',
        effects: {},
      },
    ],
  },

  lunch_choice: {
    id: 'lunch_choice',
    act: 1,
    title: 'What do you do?',
    background: 'bg-gradient-to-br from-orange-300 to-red-300',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'You recognize that Alex looks lonely and uncertain.',
      },
    ],
    choices: [
      {
        id: 'invite_alex',
        text: 'Hey Alex, want to sit with us?',
        nextSceneId: 'alex_joins',
        effects: {
          emotion: 'proud',
          relationships: [
            { characterId: 'newStudent', change: 30 },
            { characterId: 'bestFriend', change: 5 },
          ],
          stats: [
            { stat: 'empathy', change: 10 },
            { stat: 'courage', change: 5 },
          ],
        },
      },
      {
        id: 'stay_with_jordan',
        text: 'Just focus on catching up with Jordan.',
        nextSceneId: 'test_stress',
        effects: {
          emotion: 'calm',
          relationships: [{ characterId: 'bestFriend', change: 5 }],
        },
      },
    ],
  },

  alex_joins: {
    id: 'alex_joins',
    act: 1,
    title: 'Making a Connection',
    background: 'bg-gradient-to-br from-orange-300 to-red-300',
    dialogue: [
      {
        speaker: 'newStudent',
        text: 'Really? Thanks! I wasn\'t sure where to sit.',
        emotion: 'relieved',
      },
      {
        speaker: 'bestFriend',
        text: 'Yeah, come join us! How are you liking the school so far?',
        emotion: 'happy',
      },
      {
        speaker: 'newStudent',
        text: 'It\'s... a lot. Everything\'s new. But this helps. Thanks.',
        emotion: 'hopeful',
      },
      {
        speaker: 'narrator',
        text: 'You feel good about reaching out. Sometimes small acts of kindness make a big difference.',
      },
    ],
    choices: [
      {
        id: 'continue',
        text: 'Continue',
        nextSceneId: 'test_stress',
        effects: {
          unlockSkill: 'empathy_reach_out',
        },
      },
    ],
  },

  test_stress: {
    id: 'test_stress',
    act: 1,
    title: 'Test Week',
    background: 'bg-gradient-to-br from-gray-400 to-slate-500',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'A few days later... Test week arrives. You have three major tests in two days.',
      },
      {
        speaker: 'narrator',
        text: 'Your stomach feels tight. Your mind races with everything you need to remember.',
      },
      {
        speaker: 'narrator',
        text: 'The night before the first test, you\'re sitting at your desk surrounded by notes.',
      },
    ],
    choices: [
      {
        id: 'check_emotion',
        text: 'How am I feeling right now?',
        nextSceneId: 'identify_stress',
        effects: {},
      },
    ],
  },

  identify_stress: {
    id: 'identify_stress',
    act: 1,
    title: 'Identifying Your Feelings',
    background: 'bg-gradient-to-br from-gray-400 to-slate-500',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'Take a moment to identify what you\'re feeling. Being specific helps you know how to respond.',
      },
    ],
    choices: [
      {
        id: 'overwhelmed',
        text: 'Overwhelmed - like there\'s too much to handle',
        nextSceneId: 'coping_choice',
        effects: {
          emotion: 'overwhelmed',
          stats: [{ stat: 'selfRespect', change: 10 }],
        },
      },
      {
        id: 'anxious',
        text: 'Anxious - worried about failing',
        nextSceneId: 'coping_choice',
        effects: {
          emotion: 'anxious',
          stats: [{ stat: 'selfRespect', change: 10 }],
        },
      },
      {
        id: 'stressed',
        text: 'Stressed - under pressure',
        nextSceneId: 'coping_choice',
        effects: {
          emotion: 'stressed',
          stats: [{ stat: 'selfRespect', change: 10 }],
        },
      },
    ],
  },

  coping_choice: {
    id: 'coping_choice',
    act: 1,
    title: 'Regulation Station',
    background: 'bg-gradient-to-br from-teal-400 to-cyan-500',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'You\'re feeling stressed. What helps when you feel this way?',
      },
    ],
    minigame: 'breathingRhythm',
    choices: [
      {
        id: 'breathing_complete',
        text: 'I feel a bit calmer now',
        nextSceneId: 'talk_or_alone',
        effects: {
          emotion: 'calm',
          unlockSkill: 'deep_breathing',
        },
      },
    ],
  },

  talk_or_alone: {
    id: 'talk_or_alone',
    act: 1,
    title: 'What Next?',
    background: 'bg-gradient-to-br from-gray-400 to-slate-500',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'The breathing helped a little, but you\'re still feeling the pressure.',
      },
    ],
    choices: [
      {
        id: 'talk_parent',
        text: 'Talk to a parent about how stressed I\'m feeling',
        nextSceneId: 'parent_support',
        effects: {
          relationships: [{ characterId: 'parent', change: 10 }],
          stats: [{ stat: 'courage', change: 10 }],
        },
      },
      {
        id: 'handle_alone',
        text: 'Keep studying, I can handle this on my own',
        nextSceneId: 'alone_consequences',
        effects: {
          emotion: 'stressed',
          stats: [{ stat: 'selfRespect', change: -5 }],
        },
      },
    ],
  },

  parent_support: {
    id: 'parent_support',
    act: 1,
    title: 'Seeking Support',
    background: 'bg-gradient-to-br from-pink-300 to-rose-400',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'You find your parent in the living room.',
      },
      {
        speaker: 'player',
        text: 'Hey... can we talk? I\'m really stressed about these tests.',
      },
      {
        speaker: 'parent',
        text: 'Of course. Come sit down. Tell me what\'s going on.',
        emotion: 'calm',
      },
      {
        speaker: 'narrator',
        text: 'You explain how overwhelmed you feel. Your parent listens without judgment.',
      },
      {
        speaker: 'parent',
        text: 'It sounds like you\'re putting a lot of pressure on yourself. Let\'s break this down together.',
        emotion: 'calm',
      },
      {
        speaker: 'narrator',
        text: 'Together, you create a study plan that feels manageable. You feel supported.',
      },
    ],
    choices: [
      {
        id: 'continue',
        text: 'That really helped',
        nextSceneId: 'act1_complete',
        effects: {
          emotion: 'relieved',
          unlockSkill: 'ask_for_help',
          achievements: ['reached_out_family'],
        },
      },
    ],
  },

  alone_consequences: {
    id: 'alone_consequences',
    act: 1,
    title: 'Going It Alone',
    background: 'bg-gradient-to-br from-gray-500 to-slate-600',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'You study late into the night, trying to memorize everything.',
      },
      {
        speaker: 'narrator',
        text: 'By midnight, you\'re exhausted and the words blur together.',
      },
      {
        speaker: 'narrator',
        text: 'The next day, the test is harder than you expected. You feel tired and unfocused.',
      },
      {
        speaker: 'narrator',
        text: 'Sometimes we need help, even when we think we should handle things alone.',
      },
    ],
    choices: [
      {
        id: 'reflect',
        text: 'I could have asked for help...',
        nextSceneId: 'act1_complete',
        effects: {
          emotion: 'disappointed',
        },
      },
    ],
  },

  act1_complete: {
    id: 'act1_complete',
    act: 1,
    title: 'Emotional Awareness: Complete',
    background: 'bg-gradient-to-br from-green-400 to-emerald-500',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'You\'ve learned to recognize and name your emotions more clearly.',
      },
      {
        speaker: 'narrator',
        text: 'You\'ve discovered that what you feel matters, and there are ways to cope.',
      },
      {
        speaker: 'narrator',
        text: 'Next challenge: Understanding what you see online...',
      },
    ],
    choices: [
      {
        id: 'continue',
        text: 'Continue to Act 2',
        nextSceneId: 'act2_intro',
        effects: {},
      },
    ],
  },

  act2_intro: {
    id: 'act2_intro',
    act: 2,
    title: 'Online vs. Reality',
    background: 'bg-gradient-to-br from-purple-400 to-pink-400',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'Later that week, you\'re scrolling through social media during a break.',
      },
      {
        speaker: 'narrator',
        text: 'Everyone seems to be living their best life. Perfect photos, exciting activities.',
      },
    ],
    choices: [
      {
        id: 'start_scroll',
        text: 'Keep scrolling',
        nextSceneId: 'social_media_scroll',
        effects: {},
      },
    ],
  },

  social_media_scroll: {
    id: 'social_media_scroll',
    act: 2,
    title: 'Social Media Feed',
    background: 'bg-gradient-to-br from-purple-400 to-pink-400',
    dialogue: [],
    minigame: 'socialMediaScroll',
    choices: [
      {
        id: 'scroll_complete',
        text: 'Stop scrolling',
        nextSceneId: 'scroll_reflection',
        effects: {},
      },
    ],
  },

  scroll_reflection: {
    id: 'scroll_reflection',
    act: 2,
    title: 'How Do You Feel?',
    background: 'bg-gradient-to-br from-purple-400 to-pink-400',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'After 20 minutes of scrolling, you notice you feel different than before.',
      },
    ],
    choices: [
      {
        id: 'feeling_down',
        text: 'I feel worse... like my life isn\'t as good',
        nextSceneId: 'comparison_trap',
        effects: {
          emotion: 'disappointed',
          stats: [{ stat: 'criticalThinking', change: 10 }],
        },
      },
      {
        id: 'feeling_jealous',
        text: 'I feel jealous of what everyone else is doing',
        nextSceneId: 'comparison_trap',
        effects: {
          emotion: 'frustrated',
          stats: [{ stat: 'criticalThinking', change: 10 }],
        },
      },
    ],
  },

  comparison_trap: {
    id: 'comparison_trap',
    act: 2,
    title: 'The Comparison Trap',
    background: 'bg-gradient-to-br from-indigo-400 to-purple-500',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'Social media often shows highlight reels, not real life.',
      },
      {
        speaker: 'narrator',
        text: 'What you\'re seeing has been carefully selected and edited.',
      },
      {
        speaker: 'bestFriend',
        text: '*Text message* Hey, you okay? You seem quiet.',
        emotion: 'worried',
      },
    ],
    choices: [
      {
        id: 'share_feelings',
        text: 'Actually, I\'ve been feeling kinda down from social media',
        nextSceneId: 'friend_understanding',
        effects: {
          relationships: [{ characterId: 'bestFriend', change: 10 }],
          stats: [{ stat: 'courage', change: 10 }],
        },
      },
      {
        id: 'dismiss',
        text: 'Yeah I\'m fine, just tired',
        nextSceneId: 'influencer_post',
        effects: {},
      },
    ],
  },

  friend_understanding: {
    id: 'friend_understanding',
    act: 2,
    title: 'Real Talk',
    background: 'bg-gradient-to-br from-amber-300 to-orange-400',
    dialogue: [
      {
        speaker: 'bestFriend',
        text: 'Oh wow, same actually. Everyone\'s lives look perfect online.',
        emotion: 'relieved',
      },
      {
        speaker: 'bestFriend',
        text: 'Remember how I posted that fun weekend pic? I was actually super stressed that day.',
        emotion: 'honest',
      },
      {
        speaker: 'narrator',
        text: 'You both talk about the pressure to look happy all the time online.',
      },
      {
        speaker: 'narrator',
        text: 'It helps to know you\'re not alone in feeling this way.',
      },
    ],
    choices: [
      {
        id: 'continue',
        text: 'Thanks for being real with me',
        nextSceneId: 'influencer_post',
        effects: {
          emotion: 'relieved',
          relationships: [{ characterId: 'bestFriend', change: 10 }],
        },
      },
    ],
  },

  influencer_post: {
    id: 'influencer_post',
    act: 2,
    title: 'Influencer Advice',
    background: 'bg-gradient-to-br from-purple-400 to-pink-500',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'You see a post from @MindsetGuru, a popular mental health influencer.',
      },
      {
        speaker: 'influencer',
        text: '"Feeling anxious? Just choose to be happy! It\'s all about mindset! 💪✨"',
      },
      {
        speaker: 'narrator',
        text: 'The post has 50k likes. But something feels... off about this advice.',
      },
    ],
    minigame: 'factCheck',
    choices: [
      {
        id: 'complete_check',
        text: 'Continue',
        nextSceneId: 'bad_advice',
        effects: {
          stats: [{ stat: 'criticalThinking', change: 15 }],
        },
      },
    ],
  },

  bad_advice: {
    id: 'bad_advice',
    act: 2,
    title: 'Spotting Bad Advice',
    background: 'bg-gradient-to-br from-red-400 to-pink-400',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'You found the red flags: No credentials, oversimplifies complex issues, no sources.',
      },
      {
        speaker: 'narrator',
        text: 'Real mental health advice comes from qualified professionals, not influencers.',
      },
      {
        speaker: 'narrator',
        text: 'Sometimes popular doesn\'t mean correct.',
      },
    ],
    choices: [
      {
        id: 'continue',
        text: 'I\'ll be more careful about who I trust online',
        nextSceneId: 'act2_complete',
        effects: {
          unlockSkill: 'critical_evaluation',
        },
      },
    ],
  },

  act2_complete: {
    id: 'act2_complete',
    act: 2,
    title: 'Digital Literacy: Complete',
    background: 'bg-gradient-to-br from-green-400 to-emerald-500',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'You\'ve learned to think critically about what you see online.',
      },
      {
        speaker: 'narrator',
        text: 'Social media can be fun, but it\'s important to remember it\'s not the full picture.',
      },
      {
        speaker: 'narrator',
        text: 'Next: Navigating complex friend situations...',
      },
    ],
    choices: [
      {
        id: 'continue',
        text: 'Continue to Act 3',
        nextSceneId: 'act3_intro',
        effects: {},
      },
    ],
  },

  act3_intro: {
    id: 'act3_intro',
    act: 3,
    title: 'Navigating Friendships',
    background: 'bg-gradient-to-br from-blue-400 to-cyan-400',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'Friday afternoon. Your phone buzzes with a group chat notification.',
      },
    ],
    choices: [
      {
        id: 'check_phone',
        text: 'Check the message',
        nextSceneId: 'group_chat_drama',
        effects: {},
      },
    ],
  },

  group_chat_drama: {
    id: 'group_chat_drama',
    act: 3,
    title: 'Group Chat',
    background: 'bg-gradient-to-br from-slate-600 to-gray-700',
    dialogue: [
      {
        speaker: 'bestFriend',
        text: 'Okay everyone, planning party for Saturday',
      },
      {
        speaker: 'narrator',
        text: '*Friend 2* Can\'t wait!',
      },
      {
        speaker: 'narrator',
        text: '*Friend 3* Should we invite Alex?',
      },
      {
        speaker: 'bestFriend',
        text: 'Ugh no, they\'ve been so annoying lately',
      },
      {
        speaker: 'narrator',
        text: '*Friend 2* Yeah let\'s just... not mention it',
      },
      {
        speaker: 'narrator',
        text: 'Your stomach tightens. This doesn\'t feel right.',
      },
    ],
    choices: [
      {
        id: 'speak_up',
        text: 'That seems mean though...',
        nextSceneId: 'speak_up_response',
        effects: {
          stats: [
            { stat: 'courage', change: 15 },
            { stat: 'selfRespect', change: 10 },
          ],
          relationships: [
            { characterId: 'bestFriend', change: -5 },
            { characterId: 'newStudent', change: 20 },
          ],
        },
      },
      {
        id: 'go_along',
        text: 'Yeah, good idea',
        nextSceneId: 'go_along_guilt',
        effects: {
          emotion: 'conflicted',
          stats: [{ stat: 'selfRespect', change: -10 }],
          relationships: [{ characterId: 'bestFriend', change: 5 }],
        },
      },
      {
        id: 'change_subject',
        text: 'Hey, what are we doing for the party?',
        nextSceneId: 'deflect_temporary',
        effects: {},
      },
    ],
  },

  speak_up_response: {
    id: 'speak_up_response',
    act: 3,
    title: 'Standing Up',
    background: 'bg-gradient-to-br from-slate-600 to-gray-700',
    dialogue: [
      {
        speaker: 'bestFriend',
        text: 'What? We don\'t have to invite everyone to everything',
      },
      {
        speaker: 'narrator',
        text: '*Friend 2* Yeah it\'s not a big deal',
      },
    ],
    choices: [
      {
        id: 'stand_firm',
        text: 'I know, but Alex would feel really left out',
        nextSceneId: 'stand_firm_outcome',
        effects: {
          stats: [{ stat: 'courage', change: 10 }],
        },
      },
      {
        id: 'back_down',
        text: 'You\'re right, never mind',
        nextSceneId: 'back_down_outcome',
        effects: {
          emotion: 'disappointed',
          stats: [{ stat: 'selfRespect', change: -5 }],
        },
      },
    ],
  },

  stand_firm_outcome: {
    id: 'stand_firm_outcome',
    act: 3,
    title: 'Staying True to Values',
    background: 'bg-gradient-to-br from-blue-500 to-teal-500',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'There\'s an awkward pause in the chat.',
      },
      {
        speaker: 'narrator',
        text: '*Friend 3* Actually... that\'s a good point. We should invite them.',
      },
      {
        speaker: 'bestFriend',
        text: 'Fine. Whatever.',
      },
      {
        speaker: 'narrator',
        text: 'The tension is uncomfortable, but you feel good about speaking up.',
      },
      {
        speaker: 'narrator',
        text: 'Later, Alex thanks you. They had no idea, but they appreciate having you as a friend.',
      },
    ],
    choices: [
      {
        id: 'continue',
        text: 'I did the right thing',
        nextSceneId: 'friend_concern',
        effects: {
          emotion: 'proud',
          achievements: ['stood_up_for_others'],
          unlockSkill: 'assertive_communication',
        },
      },
    ],
  },

  go_along_guilt: {
    id: 'go_along_guilt',
    act: 3,
    title: 'Going Along',
    background: 'bg-gradient-to-br from-gray-600 to-slate-700',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'The party is planned. Alex isn\'t invited.',
      },
      {
        speaker: 'narrator',
        text: 'Monday at school, you see Alex eating lunch alone again.',
      },
      {
        speaker: 'narrator',
        text: 'They look hurt. You feel a weight in your chest.',
      },
      {
        speaker: 'narrator',
        text: 'Going along felt easier in the moment, but now you wish you had spoken up.',
      },
    ],
    choices: [
      {
        id: 'apologize_later',
        text: 'Go talk to Alex and apologize',
        nextSceneId: 'make_amends',
        effects: {
          relationships: [{ characterId: 'newStudent', change: 10 }],
          stats: [{ stat: 'courage', change: 10 }],
        },
      },
      {
        id: 'avoid',
        text: 'It\'s too awkward, just move on',
        nextSceneId: 'friend_concern',
        effects: {
          emotion: 'guilty',
        },
      },
    ],
  },

  make_amends: {
    id: 'make_amends',
    act: 3,
    title: 'Making It Right',
    background: 'bg-gradient-to-br from-purple-400 to-indigo-500',
    dialogue: [
      {
        speaker: 'player',
        text: 'Hey Alex... I\'m sorry about the party. I should have said something.',
      },
      {
        speaker: 'newStudent',
        text: 'I... thanks for telling me. That actually means a lot.',
        emotion: 'relieved',
      },
      {
        speaker: 'newStudent',
        text: 'It hurt, but I appreciate you being honest now.',
        emotion: 'hopeful',
      },
      {
        speaker: 'narrator',
        text: 'It was hard, but owning your mistakes helps repair trust.',
      },
    ],
    choices: [
      {
        id: 'continue',
        text: 'I\'ll do better next time',
        nextSceneId: 'friend_concern',
        effects: {
          emotion: 'hopeful',
          unlockSkill: 'accountability',
        },
      },
    ],
  },

  deflect_temporary: {
    id: 'deflect_temporary',
    act: 3,
    title: 'Avoiding the Issue',
    background: 'bg-gradient-to-br from-gray-500 to-slate-600',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'The conversation moves on to party details.',
      },
      {
        speaker: 'narrator',
        text: 'But the uncomfortable feeling doesn\'t go away.',
      },
      {
        speaker: 'narrator',
        text: 'You avoided conflict, but you also didn\'t address what felt wrong.',
      },
    ],
    choices: [
      {
        id: 'continue',
        text: 'Continue',
        nextSceneId: 'friend_concern',
        effects: {
          emotion: 'conflicted',
        },
      },
    ],
  },

  back_down_outcome: {
    id: 'back_down_outcome',
    act: 3,
    title: 'Second-Guessing',
    background: 'bg-gradient-to-br from-gray-600 to-slate-700',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'You backed down. The chat continues planning the party.',
      },
      {
        speaker: 'narrator',
        text: 'Alex isn\'t invited. You feel disappointed in yourself.',
      },
      {
        speaker: 'narrator',
        text: 'Standing up for what\'s right isn\'t always easy, but it matters.',
      },
    ],
    choices: [
      {
        id: 'continue',
        text: 'I wish I had been braver',
        nextSceneId: 'friend_concern',
        effects: {
          emotion: 'disappointed',
        },
      },
    ],
  },

  friend_concern: {
    id: 'friend_concern',
    act: 3,
    title: 'Worried About Jordan',
    background: 'bg-gradient-to-br from-amber-400 to-orange-500',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'Over the next week, you notice Jordan acting differently.',
      },
      {
        speaker: 'narrator',
        text: 'They\'re quieter. Less energetic. They\'ve missed a few days of school.',
      },
      {
        speaker: 'bestFriend',
        text: 'I\'m just tired. I\'m fine.',
        emotion: 'stressed',
      },
      {
        speaker: 'narrator',
        text: 'But their eyes tell a different story. Something\'s wrong.',
      },
    ],
    choices: [
      {
        id: 'dig_deeper',
        text: 'Are you sure? You don\'t seem like yourself',
        nextSceneId: 'friend_opens_up',
        effects: {
          relationships: [{ characterId: 'bestFriend', change: 10 }],
        },
      },
      {
        id: 'accept_answer',
        text: 'Okay, if you say so',
        nextSceneId: 'friend_crisis',
        effects: {},
      },
    ],
  },

  friend_opens_up: {
    id: 'friend_opens_up',
    act: 3,
    title: 'Real Talk',
    background: 'bg-gradient-to-br from-blue-400 to-indigo-500',
    dialogue: [
      {
        speaker: 'bestFriend',
        text: '...Okay. Honestly? Things have been really hard at home.',
        emotion: 'sad',
      },
      {
        speaker: 'bestFriend',
        text: 'And I can\'t sleep. I keep having these awful thoughts.',
        emotion: 'worried',
      },
      {
        speaker: 'narrator',
        text: 'Your heart sinks. This sounds serious.',
      },
    ],
    choices: [
      {
        id: 'suggest_help',
        text: 'This sounds really tough. Have you talked to a counselor?',
        nextSceneId: 'friend_resistant',
        effects: {
          stats: [{ stat: 'courage', change: 10 }],
        },
      },
      {
        id: 'just_listen',
        text: 'I\'m here for you. You can talk to me.',
        nextSceneId: 'friend_grateful_but',
        effects: {
          relationships: [{ characterId: 'bestFriend', change: 5 }],
        },
      },
    ],
  },

  friend_resistant: {
    id: 'friend_resistant',
    act: 3,
    title: 'Resistance to Help',
    background: 'bg-gradient-to-br from-slate-500 to-gray-600',
    dialogue: [
      {
        speaker: 'bestFriend',
        text: 'I don\'t want to make it a big deal. It\'s not that bad.',
        emotion: 'defensive',
      },
      {
        speaker: 'narrator',
        text: 'You recognize this response. You\'ve felt it too - not wanting to bother people.',
      },
    ],
    choices: [
      {
        id: 'persist',
        text: 'If it\'s bothering you, it matters. You deserve support.',
        nextSceneId: 'friend_accepts_help',
        effects: {
          relationships: [{ characterId: 'bestFriend', change: 15 }],
          stats: [{ stat: 'courage', change: 15 }],
        },
      },
      {
        id: 'back_off',
        text: 'Okay, but I\'m worried about you',
        nextSceneId: 'friend_grateful_but',
        effects: {
          relationships: [{ characterId: 'bestFriend', change: 5 }],
        },
      },
    ],
  },

  friend_accepts_help: {
    id: 'friend_accepts_help',
    act: 3,
    title: 'Getting Support',
    background: 'bg-gradient-to-br from-cyan-400 to-blue-500',
    dialogue: [
      {
        speaker: 'bestFriend',
        text: '...You\'re right. I do need help. I\'m scared to ask but... I can\'t keep doing this.',
        emotion: 'relieved',
      },
      {
        speaker: 'narrator',
        text: 'Together, you look up the school counselor\'s office hours.',
      },
      {
        speaker: 'player',
        text: 'Want me to walk with you tomorrow?',
      },
      {
        speaker: 'bestFriend',
        text: 'Yeah. Thanks. I don\'t think I could do this alone.',
        emotion: 'hopeful',
      },
      {
        speaker: 'narrator',
        text: 'Being a good friend sometimes means encouraging them to get help you can\'t provide.',
      },
    ],
    choices: [
      {
        id: 'continue',
        text: 'Continue',
        nextSceneId: 'act3_complete',
        effects: {
          achievements: ['supported_friend_crisis'],
          unlockSkill: 'encourage_help_seeking',
        },
      },
    ],
  },

  friend_grateful_but: {
    id: 'friend_grateful_but',
    act: 3,
    title: 'Support Has Limits',
    background: 'bg-gradient-to-br from-amber-500 to-orange-600',
    dialogue: [
      {
        speaker: 'bestFriend',
        text: 'Thanks for listening. It helps to talk.',
        emotion: 'calm',
      },
      {
        speaker: 'narrator',
        text: 'You feel good about being there for your friend.',
      },
      {
        speaker: 'narrator',
        text: 'But over the next week, Jordan seems to get worse, not better.',
      },
      {
        speaker: 'narrator',
        text: 'Sometimes friend support isn\'t enough. Some problems need professional help.',
      },
    ],
    choices: [
      {
        id: 'continue',
        text: 'I should encourage them to see a counselor',
        nextSceneId: 'act3_complete',
        effects: {
          stats: [{ stat: 'criticalThinking', change: 10 }],
        },
      },
    ],
  },

  friend_crisis: {
    id: 'friend_crisis',
    act: 3,
    title: 'Missed Signs',
    background: 'bg-gradient-to-br from-red-500 to-rose-600',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'A few days later, Jordan is absent again.',
      },
      {
        speaker: 'teacher',
        text: 'Class, I want to let you know that Jordan is taking some time off for their health.',
        emotion: 'calm',
      },
      {
        speaker: 'teacher',
        text: 'They\'re getting the support they need.',
        emotion: 'calm',
      },
      {
        speaker: 'narrator',
        text: 'You feel a pang of guilt. You knew something was wrong.',
      },
      {
        speaker: 'narrator',
        text: 'When friends show signs of serious distress, it\'s important to encourage them to get help.',
      },
    ],
    choices: [
      {
        id: 'continue',
        text: 'I\'ll pay more attention next time',
        nextSceneId: 'act3_complete',
        effects: {
          emotion: 'worried',
          stats: [{ stat: 'empathy', change: 10 }],
        },
      },
    ],
  },

  act3_complete: {
    id: 'act3_complete',
    act: 3,
    title: 'Peer Dynamics: Complete',
    background: 'bg-gradient-to-br from-green-400 to-emerald-500',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'You\'ve navigated complex friendship situations.',
      },
      {
        speaker: 'narrator',
        text: 'You\'ve learned that being a good friend means sometimes encouraging professional support.',
      },
      {
        speaker: 'narrator',
        text: 'Final challenge: Knowing where to go for help...',
      },
    ],
    choices: [
      {
        id: 'continue',
        text: 'Continue to Act 4',
        nextSceneId: 'act4_intro',
        effects: {},
      },
    ],
  },

  act4_intro: {
    id: 'act4_intro',
    act: 4,
    title: 'Finding Support',
    background: 'bg-gradient-to-br from-cyan-400 to-blue-500',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'The semester has been intense. You\'ve faced stress, social pressure, and difficult decisions.',
      },
      {
        speaker: 'narrator',
        text: 'Now you\'re dealing with your own challenge: you haven\'t been sleeping well for two weeks.',
      },
      {
        speaker: 'narrator',
        text: 'You lie awake worrying. School feels overwhelming. You\'re exhausted.',
      },
    ],
    choices: [
      {
        id: 'continue',
        text: 'What should I do?',
        nextSceneId: 'support_network',
        effects: {},
      },
    ],
  },

  support_network: {
    id: 'support_network',
    act: 4,
    title: 'Support Network Map',
    background: 'bg-gradient-to-br from-teal-400 to-cyan-500',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'Let\'s think about who can help with different challenges.',
      },
      {
        speaker: 'narrator',
        text: 'Different problems need different types of support.',
      },
    ],
    minigame: 'scenarioSorting',
    choices: [
      {
        id: 'sorting_complete',
        text: 'I understand now',
        nextSceneId: 'your_decision',
        effects: {
          unlockSkill: 'match_problem_to_support',
          stats: [{ stat: 'criticalThinking', change: 15 }],
        },
      },
    ],
  },

  your_decision: {
    id: 'your_decision',
    act: 4,
    title: 'Your Challenge',
    background: 'bg-gradient-to-br from-slate-500 to-gray-600',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'Back to your situation: not sleeping, feeling overwhelmed, exhausted for two weeks.',
      },
      {
        speaker: 'narrator',
        text: 'This is affecting your daily life. Who should you talk to?',
      },
    ],
    choices: [
      {
        id: 'counselor',
        text: 'School counselor - this is ongoing mental health',
        nextSceneId: 'correct_choice_counselor',
        effects: {
          stats: [{ stat: 'courage', change: 20 }],
        },
      },
      {
        id: 'parent',
        text: 'Parent - I need support at home too',
        nextSceneId: 'correct_choice_parent',
        effects: {
          stats: [{ stat: 'courage', change: 20 }],
        },
      },
      {
        id: 'friend',
        text: 'Friend - they\'ll understand',
        nextSceneId: 'friend_not_enough',
        effects: {},
      },
      {
        id: 'handle_alone',
        text: 'Keep trying to handle it myself',
        nextSceneId: 'handling_alone_bad',
        effects: {},
      },
    ],
  },

  correct_choice_counselor: {
    id: 'correct_choice_counselor',
    act: 4,
    title: 'Seeking Professional Help',
    background: 'bg-gradient-to-br from-cyan-400 to-blue-500',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'You walk to the counselor\'s office. Your heart pounds but you know this is right.',
      },
      {
        speaker: 'counselor',
        text: 'Come in! What brings you here today?',
        emotion: 'calm',
      },
      {
        speaker: 'narrator',
        text: 'You take a breath and use one of your conversation starters.',
      },
      {
        speaker: 'player',
        text: 'I\'ve been feeling really overwhelmed, and I haven\'t been sleeping well for weeks.',
      },
      {
        speaker: 'counselor',
        text: 'Thank you for coming to talk to me. That takes courage.',
        emotion: 'calm',
      },
      {
        speaker: 'counselor',
        text: 'Let\'s work together on this. You don\'t have to carry this alone.',
        emotion: 'hopeful',
      },
      {
        speaker: 'narrator',
        text: 'Over the next few sessions, you learn coping strategies. Things start to improve.',
      },
    ],
    choices: [
      {
        id: 'continue',
        text: 'I\'m so glad I asked for help',
        nextSceneId: 'finale',
        effects: {
          emotion: 'relieved',
          achievements: ['sought_professional_help'],
          relationships: [{ characterId: 'counselor', change: 30 }],
        },
      },
    ],
  },

  correct_choice_parent: {
    id: 'correct_choice_parent',
    act: 4,
    title: 'Family Support',
    background: 'bg-gradient-to-br from-pink-400 to-rose-500',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'That evening, you sit down with your parent.',
      },
      {
        speaker: 'player',
        text: 'I need to talk about something. I haven\'t been sleeping and I feel overwhelmed.',
      },
      {
        speaker: 'parent',
        text: 'I\'m glad you told me. This sounds serious. Let\'s figure out next steps together.',
        emotion: 'calm',
      },
      {
        speaker: 'narrator',
        text: 'Together, you set up an appointment with the school counselor.',
      },
      {
        speaker: 'narrator',
        text: 'Your parent also helps you adjust your schedule to reduce stress.',
      },
      {
        speaker: 'parent',
        text: 'I\'m proud of you for speaking up.',
        emotion: 'proud',
      },
    ],
    choices: [
      {
        id: 'continue',
        text: 'I feel supported',
        nextSceneId: 'finale',
        effects: {
          emotion: 'relieved',
          achievements: ['reached_out_family'],
          relationships: [{ characterId: 'parent', change: 30 }],
        },
      },
    ],
  },

  friend_not_enough: {
    id: 'friend_not_enough',
    act: 4,
    title: 'Friend Support Has Limits',
    background: 'bg-gradient-to-br from-amber-400 to-orange-500',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'You talk to your friend. They listen and care.',
      },
      {
        speaker: 'bestFriend',
        text: 'That sounds really hard. I\'m here for you.',
        emotion: 'worried',
      },
      {
        speaker: 'narrator',
        text: 'It helps to talk, but after a few more days, you\'re still not sleeping.',
      },
      {
        speaker: 'bestFriend',
        text: 'I think this is bigger than what I can help with. Have you thought about talking to a counselor?',
        emotion: 'worried',
      },
      {
        speaker: 'narrator',
        text: 'Your friend is right. Some problems need professional support.',
      },
    ],
    choices: [
      {
        id: 'agree',
        text: 'You\'re right. I\'ll talk to the counselor.',
        nextSceneId: 'correct_choice_counselor',
        effects: {
          stats: [{ stat: 'criticalThinking', change: 10 }],
        },
      },
    ],
  },

  handling_alone_bad: {
    id: 'handling_alone_bad',
    act: 4,
    title: 'Struggling Alone',
    background: 'bg-gradient-to-br from-gray-600 to-slate-700',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'You continue trying to manage on your own.',
      },
      {
        speaker: 'narrator',
        text: 'Weeks pass. You\'re exhausted. Your grades slip. You feel worse.',
      },
      {
        speaker: 'teacher',
        text: 'Can we talk? I\'ve noticed you seem really stressed lately.',
        emotion: 'worried',
      },
      {
        speaker: 'narrator',
        text: 'Ms. Rodriguez gently suggests you talk to the counselor.',
      },
      {
        speaker: 'narrator',
        text: 'Sometimes we need others to help us see we need support.',
      },
    ],
    choices: [
      {
        id: 'accept_help',
        text: 'Okay. I\'ll make an appointment.',
        nextSceneId: 'correct_choice_counselor',
        effects: {
          relationships: [{ characterId: 'teacher', change: 15 }],
        },
      },
    ],
  },

  finale: {
    id: 'finale',
    act: 4,
    title: 'Your Journey',
    background: 'bg-gradient-to-br from-purple-500 to-pink-500',
    dialogue: [
      {
        speaker: 'narrator',
        text: 'The semester is ending. You think back on everything you\'ve experienced.',
      },
      {
        speaker: 'narrator',
        text: 'You\'ve learned to recognize your emotions.',
      },
      {
        speaker: 'narrator',
        text: 'You\'ve developed critical thinking about what you see online.',
      },
      {
        speaker: 'narrator',
        text: 'You\'ve navigated complex friendships.',
      },
      {
        speaker: 'narrator',
        text: 'And most importantly: you\'ve learned that asking for help is strength, not weakness.',
      },
    ],
    choices: [
      {
        id: 'continue',
        text: 'See my journey summary',
        nextSceneId: 'final_summary',
        effects: {},
      },
    ],
  },

  final_summary: {
    id: 'final_summary',
    act: 4,
    title: 'Journey Complete',
    background: 'bg-gradient-to-br from-green-400 to-emerald-500',
    dialogue: [],
    choices: [],
  },
};
