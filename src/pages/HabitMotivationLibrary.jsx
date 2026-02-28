import React, { useState, useEffect } from 'react';
import Header from '../components/ui/Header';
import PanicModeButton from '../components/ui/PanicModeButton';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import {
  Search,
  BookOpen,
  Heart,
  Brain,
  Dumbbell,
  Coffee,
  Moon,
  Sun,
  X,
  Clock,
  Bookmark,
  Share2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Star
} from 'lucide-react';

const HabitMotivationLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedResource, setSelectedResource] = useState(null);
  const [bookmarkedResources, setBookmarkedResources] = useState(new Set());
  const [readingProgress, setReadingProgress] = useState({});
  const [isReadingMode, setIsReadingMode] = useState(false);

  const categories = [
    { name: 'All', icon: BookOpen },
    { name: 'Mental Health', icon: Brain },
    { name: 'Physical Health', icon: Dumbbell },
    { name: 'Sleep', icon: Moon },
    { name: 'Nutrition', icon: Coffee },
    { name: 'Motivation', icon: Heart },
    { name: 'Productivity', icon: Sun },
  ];

  const resources = [
    {
      id: 1,
      title: 'Mindfulness Meditation Guide',
      description: 'Learn the basics of mindfulness meditation and how it can reduce stress and improve focus.',
      category: 'Mental Health',
      type: 'Guide',
      readTime: '5 min',
      difficulty: 'Beginner',
      rating: 4.8,
      views: 1247,
      content: `
# Mindfulness Meditation Guide

## Introduction

Mindfulness meditation is a powerful practice that can help you cultivate awareness, reduce stress, and improve your overall mental well-being. This guide will walk you through the basics of getting started with mindfulness meditation.

## What is Mindfulness?

Mindfulness is the practice of being fully present and engaged in the current moment, without judgment. It's about observing your thoughts, feelings, and sensations as they arise, without trying to change them.

## Getting Started

### 1. Find a Quiet Space
Choose a quiet, comfortable place where you won't be disturbed. Sit comfortably with your back straight but not rigid.

### 2. Set a Timer
Start with just 5 minutes. As you get more comfortable with the practice, you can gradually increase the time.

### 3. Focus on Your Breath
Close your eyes and bring your attention to your breath. Notice the sensation of the air entering and leaving your nostrils, or the rise and fall of your chest.

### 4. Handle Wandering Thoughts
When your mind wanders (and it will!), gently bring your attention back to your breath without judgment.

## Benefits of Mindfulness Meditation

- **Reduced Stress**: Regular practice can lower cortisol levels and reduce anxiety
- **Improved Focus**: Better concentration and attention span
- **Emotional Regulation**: Greater awareness of emotions and better emotional control
- **Better Sleep**: Improved sleep quality and reduced insomnia

## Tips for Success

- **Consistency is Key**: Try to meditate at the same time each day
- **Be Patient**: Don't expect immediate results. Mindfulness is a skill that develops over time
- **Start Small**: Even 5 minutes a day can make a difference
- **Use Guided Meditations**: Apps like Headspace or Calm can be helpful when starting out

Remember, mindfulness is not about emptying your mind of thoughts. It's about observing them without judgment and gently returning your focus to the present moment.
      `,
      tags: ['meditation', 'stress relief', 'focus', 'mental health']
    },
    {
      id: 2,
      title: 'Building Healthy Sleep Habits',
      description: 'Essential tips for improving your sleep quality and establishing a consistent sleep schedule.',
      category: 'Sleep',
      type: 'Article',
      readTime: '8 min',
      difficulty: 'Intermediate',
      rating: 4.6,
      views: 2156,
      content: `
# Building Healthy Sleep Habits

## The Importance of Quality Sleep

Sleep is not just a passive state of rest—it's an active process that allows your body and mind to recover, consolidate memories, and regulate important functions. Poor sleep can lead to decreased cognitive function, mood disturbances, and increased risk of chronic diseases.

## Understanding Sleep Cycles

A typical night's sleep consists of several cycles, each lasting about 90 minutes. These cycles include:

- **Stage 1 (N1)**: Light sleep, transition from wakefulness
- **Stage 2 (N2)**: Deeper sleep, body temperature drops
- **Stage 3 (N3)**: Deep sleep, restorative processes occur
- **REM Sleep**: Rapid eye movement, dreaming occurs

## Creating a Sleep-Friendly Environment

### Bedroom Setup
- Keep your bedroom cool (65-68°F/18-20°C)
- Use blackout curtains to block light
- Invest in a comfortable mattress and pillows
- Remove electronic devices from the bedroom

### Evening Routine
- Dim lights 1-2 hours before bed
- Avoid screens (blue light suppresses melatonin)
- Create a relaxing pre-sleep ritual
- Avoid caffeine after 2 PM

## Sleep Hygiene Best Practices

### Consistent Schedule
Go to bed and wake up at the same time every day, even on weekends. This helps regulate your body's internal clock.

### Pre-Sleep Routine
- Read a book (not on a screen)
- Take a warm bath or shower
- Practice relaxation techniques
- Journal about your day

### Daytime Habits
- Get exposure to natural sunlight during the day
- Exercise regularly (but not too close to bedtime)
- Avoid long naps (limit to 20-30 minutes)
- Eat your last meal 2-3 hours before bed

## Common Sleep Issues and Solutions

### Insomnia
- Establish a consistent sleep schedule
- Create a sleep-friendly environment
- Practice relaxation techniques before bed
- Avoid clock-watching if you wake up

### Sleep Apnea
- Maintain a healthy weight
- Sleep on your side rather than your back
- Avoid alcohol and sedatives
- Consult a healthcare professional for diagnosis

### Restless Legs Syndrome
- Regular exercise and stretching
- Avoid caffeine and nicotine
- Maintain adequate iron levels
- Consider magnesium supplementation

## When to Seek Professional Help

If you consistently experience:
- Difficulty falling asleep or staying asleep
- Excessive daytime sleepiness
- Loud snoring or breathing pauses during sleep
- Uncontrollable leg movements during sleep

Consult a healthcare professional or sleep specialist for proper evaluation and treatment.

## Tracking Your Sleep

Consider using a sleep tracker to monitor your sleep patterns. Apps and wearable devices can provide valuable insights into your sleep quality and help you identify areas for improvement.

Remember, good sleep is a cornerstone of mental and physical health. By implementing these habits consistently, you can significantly improve your sleep quality and overall well-being.
      `,
      tags: ['sleep', 'habits', 'rest', 'health']
    },
    {
      id: 3,
      title: 'Nutrition for Mental Wellness',
      description: 'How the foods you eat can impact your mood, energy levels, and overall mental health.',
      category: 'Nutrition',
      type: 'Guide',
      readTime: '10 min',
      difficulty: 'Beginner',
      rating: 4.9,
      views: 3421,
      content: `
# Nutrition for Mental Wellness

## The Gut-Brain Connection

Did you know that your gut and brain are intimately connected? The gut-brain axis is a bidirectional communication system between your central nervous system and your enteric nervous system. This connection explains why what you eat can have such a profound impact on your mental health.

## Key Nutrients for Mental Health

### Omega-3 Fatty Acids
Found in fatty fish (salmon, mackerel, sardines), walnuts, and flaxseeds. Omega-3s are essential for brain health and have anti-inflammatory properties that can help reduce symptoms of depression.

### B Vitamins
Particularly B12, B6, and folate. These vitamins are crucial for neurotransmitter production and energy metabolism. Sources include leafy greens, legumes, eggs, and fortified cereals.

### Vitamin D
Often called the "sunshine vitamin," vitamin D deficiency has been linked to depression and seasonal affective disorder. Get it from sunlight exposure, fatty fish, and fortified foods.

### Magnesium
Important for nerve function and mood regulation. Found in nuts, seeds, leafy greens, and whole grains.

### Antioxidants
Protect brain cells from oxidative stress. Found in colorful fruits and vegetables, particularly berries, dark leafy greens, and colorful peppers.

## Foods That Support Mental Health

### Mood-Boosting Foods
- **Fatty Fish**: Rich in omega-3s and vitamin D
- **Dark Chocolate**: Contains flavonoids and can increase serotonin levels
- **Bananas**: Provide vitamin B6 and natural sugars for quick energy
- **Nuts and Seeds**: Good sources of healthy fats and magnesium
- **Leafy Greens**: High in folate and antioxidants

### Foods to Limit
- **Processed Foods**: High in refined sugars and unhealthy fats
- **Excessive Caffeine**: Can increase anxiety and disrupt sleep
- **Alcohol**: Can worsen depression and interfere with sleep
- **High-Sugar Foods**: Cause blood sugar spikes and crashes

## The Mediterranean Diet and Mental Health

The Mediterranean diet has been extensively studied for its benefits to both physical and mental health. This eating pattern emphasizes:

- Plenty of fruits and vegetables
- Whole grains
- Healthy fats (olive oil, nuts, fish)
- Moderate amounts of dairy, poultry, and eggs
- Limited red meat and sweets

Studies have shown that adherence to the Mediterranean diet is associated with reduced risk of depression and improved cognitive function.

## Blood Sugar and Mood

Maintaining stable blood sugar levels is crucial for mental health. When blood sugar drops too low (hypoglycemia), it can cause irritability, anxiety, and difficulty concentrating.

### Tips for Blood Sugar Stability
- Eat regular, balanced meals
- Include protein with each meal
- Choose complex carbohydrates over simple sugars
- Stay hydrated
- Limit caffeine and alcohol

## Hydration and Mental Health

Dehydration can impair cognitive function and mood. Even mild dehydration can affect concentration, alertness, and short-term memory.

Aim for at least 8 glasses of water per day, more if you're active or in hot weather.

## The Role of Probiotics

The gut microbiome plays a crucial role in mental health through the gut-brain axis. Probiotics can help maintain a healthy balance of gut bacteria.

Sources of probiotics include:
- Yogurt with live cultures
- Kefir
- Sauerkraut
- Kimchi
- Kombucha

## Meal Planning for Mental Wellness

### Breakfast Ideas
- Oatmeal with berries and nuts
- Greek yogurt with fruit and granola
- Whole grain toast with avocado and eggs
- Smoothie with spinach, banana, and almond milk

### Lunch Ideas
- Grilled salmon salad with mixed greens
- Quinoa bowl with vegetables and chickpeas
- Turkey wrap with whole grain tortilla
- Lentil soup with whole grain bread

### Dinner Ideas
- Baked chicken with sweet potatoes and broccoli
- Stir-fried tofu with brown rice and vegetables
- Grilled fish with quinoa and asparagus
- Vegetable stir-fry with lean beef

### Snack Ideas
- Apple slices with almond butter
- Carrot sticks with hummus
- Handful of mixed nuts
- Greek yogurt
- Dark chocolate (in moderation)

## Supplements to Consider

While it's best to get nutrients from food, some people may benefit from supplements:

- **Omega-3 Fish Oil**: For brain health
- **Vitamin D**: If you have limited sun exposure
- **Magnesium**: For relaxation and sleep
- **Probiotics**: For gut health

Always consult with a healthcare professional before starting supplements.

## Lifestyle Factors

Nutrition is just one piece of the mental health puzzle. Other important factors include:

- Regular exercise
- Adequate sleep
- Stress management techniques
- Social connections
- Professional mental health support when needed

## Conclusion

The food you eat has a powerful impact on your mental health. By choosing nutrient-rich foods and maintaining stable blood sugar levels, you can support your brain function and emotional well-being. Remember that small, sustainable changes in your eating habits can lead to significant improvements in how you feel.

If you're struggling with mental health issues, nutrition can be a helpful complementary approach, but it's not a substitute for professional medical care.
      `,
      tags: ['nutrition', 'mental health', 'diet', 'wellness']
    },
    {
      id: 4,
      title: 'Overcoming Procrastination',
      description: 'Practical strategies to break the cycle of procrastination and build productive habits.',
      category: 'Productivity',
      type: 'Article',
      readTime: '7 min',
      difficulty: 'Intermediate',
      rating: 4.7,
      views: 1893,
      content: `
# Overcoming Procrastination

## Understanding Procrastination

Procrastination is the act of delaying or postponing tasks, often despite knowing that this delay will have negative consequences. It's a common challenge that affects people from all walks of life, but it can be overcome with the right strategies and mindset.

## Why We Procrastinate

### Fear of Failure
Many people procrastinate because they're afraid of not doing a good job or failing altogether. By not starting, they avoid the possibility of negative judgment.

### Perfectionism
Perfectionists often delay starting tasks because they want everything to be perfect from the beginning. This unrealistic expectation prevents them from taking the first step.

### Lack of Motivation
When tasks seem boring, difficult, or unrewarding, it's easy to put them off in favor of more immediately pleasurable activities.

### Poor Time Management
Without clear goals and deadlines, it's easy to let tasks slip. Poor planning can make tasks seem overwhelming.

### Task Aversion
Some tasks are inherently unpleasant, leading to avoidance behavior.

## The Cost of Procrastination

Procrastination doesn't just delay tasks—it has real consequences:

- Increased stress and anxiety
- Missed opportunities
- Lower quality work (due to rushed completion)
- Damaged relationships and reputation
- Reduced self-esteem
- Health issues from chronic stress

## Strategies to Overcome Procrastination

### 1. Break Tasks into Smaller Steps

Large tasks can be intimidating. Break them down into smaller, manageable steps.

**Example:** Instead of "Write a 10-page report," break it into:
- Research topic (30 minutes)
- Outline main points (20 minutes)
- Write introduction (45 minutes)
- Write body paragraphs (2 hours each day)

### 2. Use the 5-Minute Rule

Commit to working on a task for just 5 minutes. Often, starting is the hardest part, and once you begin, you'll continue.

### 3. Set Specific Goals and Deadlines

Vague goals like "work on project" are easy to procrastinate. Be specific: "Write 500 words by 2 PM."

### 4. Create Accountability

Share your goals with others or use accountability partners. Knowing someone else is checking on your progress can motivate you.

### 5. Eliminate Distractions

Create a focused work environment:
- Turn off notifications
- Use website blockers
- Work in a quiet space
- Set specific work times

### 6. Use the Pomodoro Technique

Work for 25 minutes, then take a 5-minute break. This helps maintain focus and prevents burnout.

### 7. Reward Yourself

Set up a reward system for completing tasks. Positive reinforcement can help build momentum.

### 8. Practice Self-Compassion

Don't beat yourself up for procrastinating. Acknowledge it, learn from it, and move forward.

## Building Productive Habits

### Start Small
Begin with tiny habits that are easy to maintain. Success builds momentum.

### Habit Stacking
Attach new habits to existing ones. For example, "After I brush my teeth, I'll spend 5 minutes planning my day."

### Environment Design
Make your environment conducive to productivity. Keep your workspace organized and remove temptations.

### Track Your Progress
Use a habit tracker or journal to monitor your progress and celebrate wins.

## Overcoming Mental Barriers

### Reframe Your Thinking
Instead of "This is going to be hard," try "This is an opportunity to learn and grow."

### Focus on Progress, Not Perfection
Done is better than perfect. Aim for completion rather than flawlessness.

### Build Self-Efficacy
Start with easy wins to build confidence in your ability to complete tasks.

## Tools and Apps to Help

- **Todoist or Microsoft To Do**: Task management
- **Forest App**: Gamifies staying focused
- **Freedom or StayFocusd**: Website blockers
- **Habitica**: Turns habits into a game
- **RescueTime**: Tracks how you spend your time

## When to Seek Help

If procrastination is severely impacting your life, consider speaking with a therapist or counselor. Conditions like ADHD, anxiety, or depression can contribute to procrastination and may require professional treatment.

## Conclusion

Procrastination is a habit that can be broken with consistent effort and the right strategies. By understanding why you procrastinate and implementing practical solutions, you can build productive habits that lead to greater success and satisfaction in life.

Remember, change takes time. Be patient with yourself and celebrate small victories along the way.
      `,
      tags: ['procrastination', 'productivity', 'habits', 'motivation']
    },
    {
      id: 5,
      title: 'Daily Exercise Routines',
      description: 'Simple, effective exercise routines that fit into a busy schedule and boost mental health.',
      category: 'Physical Health',
      type: 'Guide',
      readTime: '12 min',
      difficulty: 'Beginner',
      rating: 4.5,
      views: 2765,
      content: `
# Daily Exercise Routines for Mental Health

## The Mental Health Benefits of Exercise

Exercise is not just good for your physical health—it's also a powerful tool for mental wellness. Regular physical activity can:

- Reduce symptoms of depression and anxiety
- Improve mood and self-esteem
- Enhance cognitive function
- Reduce stress and improve sleep
- Increase endorphin production (natural mood lifters)
- Provide a healthy outlet for emotions

## Getting Started: Basic Principles

### Start Slow
If you're new to exercise, begin with short sessions and gradually increase duration and intensity.

### Consistency Over Intensity
It's better to exercise for 20 minutes every day than 2 hours once a week.

### Find What You Enjoy
Choose activities you like—otherwise, you won't stick with them.

### Listen to Your Body
Rest when you need to, and consult a doctor before starting a new exercise program.

## 10-Minute Morning Routine

This quick routine can be done right after waking up, before your day gets busy.

### Warm-Up (2 minutes)
- March in place, swinging arms
- Gentle neck rolls and shoulder shrugs

### Main Exercises (6 minutes)
**Jumping Jacks (1 minute):** Stand with feet together, jump while raising arms overhead, then return to start.

**Wall Push-Ups (1 minute):** Stand facing a wall, place hands shoulder-width apart, bend elbows to lower chest toward wall, then push back.

**Chair Squats (1 minute):** Stand in front of a chair, lower as if sitting down, then stand up. Don't actually sit.

**Arm Circles (1 minute):** Extend arms to sides, make small circles forward, then backward.

**Marching High Knees (1 minute):** March in place, bringing knees up toward chest.

**Standing Forward Bend (1 minute):** Bend at hips to touch toes, then roll up slowly.

### Cool Down (2 minutes)
- Deep breathing exercises
- Gentle stretches

## 20-Minute Desk Job Routine

Perfect for office workers who sit most of the day.

### Seated Warm-Up (3 minutes)
- Neck stretches: Tilt head side to side, forward and back
- Shoulder rolls: Roll shoulders forward and backward
- Wrist circles: Rotate wrists in both directions
- Ankle circles: Rotate ankles while seated

### Standing Exercises (12 minutes)
**Desk Push-Ups (2 minutes):** Stand facing desk, place hands on edge, walk feet back, lower chest toward desk.

**Standing Leg Lifts (2 minutes):** Stand tall, lift one leg out to side, hold, lower. Alternate sides.

**Calf Raises (2 minutes):** Rise up on toes, lower slowly. Repeat.

**Wall Sit (2 minutes):** Lean against wall, slide down until thighs are parallel to floor, hold.

**Arm Raises (2 minutes):** Raise arms out to sides and overhead, lower slowly.

**March in Place (2 minutes):** March with high knees.

### Cool Down Stretches (5 minutes)
- Shoulder stretch: Reach one arm across body
- Chest stretch: Clasp hands behind back
- Quad stretch: Pull one heel toward buttocks
- Hamstring stretch: Reach toward toes while seated
- Wrist and forearm stretch

## 30-Minute Home Workout

A more comprehensive routine for those with more time.

### Warm-Up (5 minutes)
- Light cardio: March in place or dance to music
- Dynamic stretches: Arm circles, leg swings, torso twists

### Strength Training (15 minutes)
**Bodyweight Squats (3 sets of 10):** Stand with feet shoulder-width, lower as if sitting in chair.

**Push-Ups (3 sets of 8-12):** Modify on knees if needed.

**Lunges (3 sets of 8 per leg):** Step forward into lunge position, alternate legs.

**Plank (3 sets of 20-30 seconds):** Hold forearm plank position.

**Superman (3 sets of 10):** Lie face down, lift arms and legs off ground.

### Cardio Burst (5 minutes)
- High knees (1 minute)
- Butt kicks (1 minute)
- Jumping jacks (1 minute)
- Mountain climbers (1 minute)
- Rest (1 minute)

### Cool Down and Stretching (5 minutes)
- Child's pose
- Cat-cow stretch
- Seated forward bend
- Butterfly stretch
- Corpse pose with deep breathing

## Yoga for Mental Health

Yoga combines physical movement with mindfulness and breathing, making it particularly beneficial for mental health.

### Simple Yoga Sequence (20 minutes)

1. **Mountain Pose (Tadasana)** - 1 minute: Stand tall, ground through feet, reach arms overhead.

2. **Forward Bend (Uttanasana)** - 1 minute: Fold forward from hips, let hands reach toward floor.

3. **Downward Dog (Adho Mukha Svanasana)** - 1 minute: Create inverted V-shape with body.

4. **Warrior I (Virabhadrasana I)** - 1 minute per side: Lunge with arms overhead.

5. **Warrior II (Virabhadrasana II)** - 1 minute per side: Open hips to side, extend arms.

6. **Triangle Pose (Trikonasana)** - 1 minute per side: Reach toward floor while keeping body open.

7. **Seated Twist** - 1 minute per side: Sit and gently twist spine.

8. **Bridge Pose (Setu Bandhasana)** - 1 minute: Lie on back, lift hips toward ceiling.

9. **Happy Baby (Ananda Balasana)** - 2 minutes: Lie on back, rock gently side to side.

10. **Corpse Pose (Savasana)** - 5 minutes: Lie flat, relax completely.

## Walking for Mental Health

Walking is one of the most accessible forms of exercise and highly effective for mental health.

### Mindful Walking Tips
- Walk in nature when possible
- Focus on your breath and surroundings
- Use it as moving meditation time
- Listen to calming music or podcasts
- Practice gratitude by noting things you're thankful for

### Walking Goals
- Start with 10-15 minute walks
- Aim for 30 minutes most days
- Gradually increase pace and duration
- Try walking meetings or phone calls

## Incorporating Exercise into Daily Life

### Habit Building Strategies
- Schedule exercise like any other important appointment
- Prepare workout clothes and equipment the night before
- Find an accountability partner
- Track your progress and celebrate milestones
- Make it enjoyable by varying activities

### Overcoming Barriers
- **Time constraints:** Break into short sessions throughout the day
- **Motivation issues:** Start very small and build gradually
- **Weather problems:** Have indoor alternatives ready
- **Physical limitations:** Consult a doctor and modify exercises as needed

## Exercise and Mental Health Conditions

### Depression
Exercise can be as effective as medication for mild depression. It increases endorphins and provides a sense of accomplishment.

### Anxiety
Regular exercise can reduce anxiety symptoms by lowering stress hormones and improving self-confidence.

### PTSD
Mindful movement practices like yoga can help process trauma and build body awareness.

### ADHD
Exercise can improve focus and reduce hyperactivity by increasing dopamine levels.

## Safety Considerations

### When to Consult a Doctor
- If you have existing health conditions
- If you're over 40 and starting a new exercise program
- If you experience chest pain, dizziness, or unusual symptoms

### Exercise Safety Tips
- Stay hydrated
- Wear appropriate clothing and shoes
- Warm up before and cool down after exercise
- Listen to your body and rest when needed
- Progress gradually to avoid injury

## Conclusion

Regular exercise is a powerful tool for maintaining mental health. Even small amounts of physical activity can make a significant difference in how you feel. Start with what feels manageable, be consistent, and gradually build from there.

Remember, the best exercise is the one you'll actually do. Find activities you enjoy, make them a regular part of your routine, and you'll reap the mental health benefits for years to come.
      `,
      tags: ['exercise', 'fitness', 'mental health', 'routines']
    },
    {
      id: 6,
      title: 'Gratitude Practice',
      description: 'How cultivating gratitude can improve your mental health and overall life satisfaction.',
      category: 'Motivation',
      type: 'Article',
      readTime: '6 min',
      difficulty: 'Beginner',
      rating: 4.8,
      views: 1987,
      content: `
# The Power of Gratitude Practice

## What is Gratitude?

Gratitude is the practice of recognizing and appreciating the good things in your life. It's about focusing on what you have rather than what you lack, and acknowledging the positive aspects of your experiences.

## The Science Behind Gratitude

Research has shown that practicing gratitude can have profound effects on mental health and well-being:

- **Improved Mood**: Gratitude practices increase positive emotions
- **Better Sleep**: Grateful people sleep better and longer
- **Reduced Depression**: Gratitude interventions reduce depressive symptoms
- **Increased Resilience**: Grateful people bounce back faster from adversity
- **Stronger Relationships**: Gratitude strengthens social bonds
- **Physical Health Benefits**: Lower blood pressure, improved immune function

## Getting Started with Gratitude Practice

### 1. Gratitude Journaling

One of the most effective ways to cultivate gratitude is through journaling. Each day, write down three things you're grateful for.

**Tips for Journaling:**
- Be specific: Instead of "my family," write "the way my sister made me laugh today"
- Include small things: "A warm cup of coffee on a chilly morning"
- Write about people: "My colleague's helpful advice on that project"
- Note experiences: "The beautiful sunset I saw on my walk home"

### 2. Gratitude Meditation

Spend 5-10 minutes each day focusing on things you're thankful for.

**Simple Gratitude Meditation:**
1. Find a quiet place to sit comfortably
2. Close your eyes and take a few deep breaths
3. Think of one person you're grateful for and why
4. Think of one experience from your day you're thankful for
5. Think of one thing about yourself you're grateful for
6. End with a moment of appreciation for your life as it is

### 3. Gratitude Letters

Write a letter expressing gratitude to someone who has made a positive impact on your life. You can choose to send it or not.

### 4. Gratitude Jar

Keep a jar where you write down things you're grateful for on slips of paper and add them throughout the week or month.

### 5. Mindful Moments

Pause throughout your day to notice and appreciate positive moments as they happen.

## Overcoming Common Challenges

### "I Don't Have Time"
Start small— even 2 minutes a day can make a difference. Try combining gratitude with existing habits, like while brushing your teeth.

### "Nothing Feels Worth Grateful For"
When times are tough, focus on basic things: clean water, a roof over your head, the ability to read this article. Gratitude doesn't ignore problems—it provides perspective.

### "It Feels Forced"
If it feels artificial at first, that's normal. Like any skill, gratitude gets easier with practice. Start with things that genuinely make you feel appreciative.

## Deepening Your Gratitude Practice

### Express Gratitude to Others
Tell people when you appreciate them. A simple "thank you" can strengthen relationships and increase your own sense of gratitude.

### Gratitude in Difficult Times
Practice "radical acceptance" by finding something to be grateful for even in challenging situations. This builds resilience.

### Gratitude for the Future
Express gratitude for positive things that haven't happened yet, creating optimism and motivation.

### Body Gratitude
Take time to appreciate your body's abilities and what it allows you to do.

## The Ripple Effect of Gratitude

When you practice gratitude regularly, it creates a positive cycle:

1. You notice more positive things in your life
2. This increases your overall happiness
3. Happier people tend to be more kind and helpful
4. This creates more positive experiences
5. Which gives you even more to be grateful for

## Gratitude and Mental Health

### Depression
Gratitude practices can help shift focus from negative thought patterns. Studies show gratitude interventions are particularly effective for reducing depressive symptoms.

### Anxiety
By focusing on what's going right rather than potential threats, gratitude can reduce anxiety and worry.

### Stress
Gratitude helps put problems in perspective and reduces the physiological effects of stress.

### Self-Esteem
Recognizing your own positive qualities and the good things in your life can improve self-worth.

## Cultural Perspectives on Gratitude

Gratitude practices exist in many cultures:

- **Japanese**: "Arigatou" culture emphasizes thankfulness in daily life
- **Native American**: Gratitude for nature and community
- **Buddhist**: Gratitude as part of mindfulness practice
- **Christian**: Gratitude to a higher power
- **Secular**: Gratitude as a psychological tool for well-being

## Making Gratitude a Habit

### Set Reminders
Use phone alarms or apps to remind you to practice gratitude.

### Create Rituals
Associate gratitude with daily activities, like meals or bedtime.

### Track Your Practice
Use a habit tracker to maintain consistency.

### Be Patient
It takes time for gratitude to become a natural way of thinking.

## Apps and Tools for Gratitude

- **Grateful**: Simple gratitude journaling app
- **Day One**: Comprehensive journaling with gratitude prompts
- **Reflectly**: AI-powered mood and gratitude tracking
- **Gratitude Journal**: Dedicated gratitude app

## Conclusion

Gratitude is a powerful practice that can transform your mental health and overall quality of life. By regularly focusing on what's good in your life, you can cultivate greater happiness, resilience, and well-being.

Start small, be consistent, and watch as gratitude becomes a natural part of how you view the world. The more you practice, the more you'll discover to be grateful for.
      `,
      tags: ['gratitude', 'mindfulness', 'mental health', 'positivity']
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.name === category);
    return cat ? cat.icon : BookOpen;
  };

  const toggleBookmark = (resourceId) => {
    setBookmarkedResources(prev => {
      const newSet = new Set(prev);
      if (newSet.has(resourceId)) {
        newSet.delete(resourceId);
      } else {
        newSet.add(resourceId);
      }
      return newSet;
    });
  };

  const openReadingView = (resource) => {
    setSelectedResource(resource);
    setIsReadingMode(true);
  };

  const closeReadingView = () => {
    setSelectedResource(null);
    setIsReadingMode(false);
  };

  const shareResource = (resource) => {
    if (navigator.share) {
      navigator.share({
        title: resource.title,
        text: resource.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${resource.title}\n${resource.description}\n${window.location.href}`);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      
      <Header />
      <PanicModeButton />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 relative z-10">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-white mb-2">Motivation Library</h1>
            <p className="text-white/70 text-lg">
              Discover resources to build healthy habits and maintain mental wellness.
            </p>
            <div className="mt-4 flex items-center space-x-4 text-sm text-white/60">
              <span className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1" />
                {resources.length} articles
              </span>
              <span className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                {resources.reduce((sum, r) => sum + r.views, 0).toLocaleString()} total views
              </span>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-white/40" />
              <input
                type="text"
                placeholder="Search articles, guides, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-white/30 bg-white/10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50 backdrop-blur-sm focus:bg-white/15 transition-all duration-300"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.name)}
                  className="flex items-center space-x-2 px-4 py-2"
                >
                  <category.icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map(resource => {
              const IconComponent = getCategoryIcon(resource.category);
              const isBookmarked = bookmarkedResources.has(resource.id);

              return (
                <Card key={resource.id} className="bg-white/10 backdrop-blur-md border-l-4 border-l-blue-500 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:bg-white/15">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <IconComponent className="h-5 w-5 text-blue-400" />
                        <CardTitle className="text-lg text-white group-hover:text-blue-300 transition-colors">
                          {resource.title}
                        </CardTitle>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(resource.id);
                          }}
                          className="p-1 h-8 w-8"
                        >
                          <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current text-yellow-400' : 'text-white/40'}`} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => shareResource(resource)}
                          className="p-1 h-8 w-8"
                        >
                          <Share2 className="h-4 w-4 text-white/40" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-sm text-white/70 mb-2">
                      <span className="px-2 py-1 bg-blue-600/40 text-blue-200 rounded-full text-xs font-medium border border-blue-500/50">
                        {resource.category}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {resource.readTime}
                      </span>
                      <span className="flex items-center">
                        <Star className="h-3 w-3 mr-1 text-yellow-400 fill-current" />
                        {resource.rating}
                      </span>
                      <span className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {resource.views}
                      </span>
                    </div>

                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)} w-fit`}>
                      {resource.difficulty}
                    </span>
                  </CardHeader>

                  <CardContent>
                    <CardDescription className="mb-4 text-white/80 leading-relaxed">
                      {resource.description}
                    </CardDescription>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-white/20 text-white/90 rounded-full text-xs border border-white/30">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <Button
                      onClick={() => openReadingView(resource)}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white transition-all duration-300 transform hover:scale-105"
                    >
                      Read Article
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-white/30" />
              <h3 className="mt-2 text-sm font-medium text-white/90">No resources found</h3>
              <p className="mt-1 text-sm text-white/60">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Reading Modal */}
      {isReadingMode && selectedResource && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-white/20">
            {/* Reading Header */}
            <div className="sticky top-0 bg-white/10 backdrop-blur-md border-b border-white/20 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeReadingView}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedResource.title}</h2>
                  <div className="flex items-center space-x-4 text-sm text-white/60 mt-1">
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {selectedResource.readTime}
                    </span>
                    <span>{selectedResource.category}</span>
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {selectedResource.views} views
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleBookmark(selectedResource.id)}
                  className="flex items-center space-x-1 border-white/30 text-white/80 hover:bg-white/20 hover:text-white"
                >
                  <Bookmark className={`h-4 w-4 ${bookmarkedResources.has(selectedResource.id) ? 'fill-current text-yellow-400' : ''}`} />
                  <span>Bookmark</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => shareResource(selectedResource)}
                  className="flex items-center space-x-1 border-white/30 text-white/80 hover:bg-white/20 hover:text-white"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
              </div>
            </div>

            {/* Reading Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-wrap leading-relaxed text-white/90">
                  {selectedResource.content}
                </div>
              </div>

              {/* Article Footer */}
              <div className="mt-8 pt-8 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-white/70">Was this helpful?</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} className="h-5 w-5 text-white/30 hover:text-yellow-400 cursor-pointer transition-colors" />
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="border-white/30 text-white/80 hover:bg-white/20 hover:text-white">
                      Previous Article
                    </Button>
                    <Button variant="outline" size="sm" className="border-white/30 text-white/80 hover:bg-white/20 hover:text-white">
                      Next Article
                    </Button>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-sm text-white/70">Tags:</span>
                  {selectedResource.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-blue-600/40 text-blue-200 rounded-full text-sm hover:bg-blue-600/60 cursor-pointer transition-colors border border-blue-500/50">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitMotivationLibrary;