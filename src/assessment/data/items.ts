import type { AssessmentMode, EvidenceContext, Goal, QuestionItem, ResponseOption } from "../domain";

type Seed = {
  constructId: string;
  facet: string;
  goals: Goal[];
  prompts: [
    Record<AssessmentMode, string>,
    Record<AssessmentMode, string>,
    Record<AssessmentMode, string>,
    Record<AssessmentMode, string>,
    Record<AssessmentMode, string>,
    Record<AssessmentMode, string>
  ];
  contexts: [EvidenceContext, EvidenceContext, EvidenceContext, EvidenceContext, EvidenceContext, EvidenceContext];
  risk?: "low" | "moderate" | "high";
};

const promptByMode = (
  self: string,
  childObserver: string,
  partnerObserver: string,
  otherObserver: string
): Record<AssessmentMode, string> => ({
  self,
  "child-observer": childObserver,
  "partner-observer": partnerObserver,
  "other-observer": otherObserver
});

const makeOptions = (constructId: string, facetId: string, context: EvidenceContext): ResponseOption[] => [
  { id: "almost-never", label: "Almost never", score: { constructId, facetId, value: -2, weight: 1, context } },
  { id: "rarely", label: "Rarely", score: { constructId, facetId, value: -1, weight: 1, context } },
  { id: "sometimes", label: "Sometimes", score: { constructId, facetId, value: 0, weight: 1, context } },
  { id: "often", label: "Often", score: { constructId, facetId, value: 1, weight: 1, context } },
  { id: "almost-always", label: "Almost always", score: { constructId, facetId, value: 2, weight: 1, context } },
  { id: "depends", label: "It depends on the situation", isUncertain: true },
  { id: "not-observed", label: "Not sure", isUncertain: true },
  { id: "prefer-not", label: "Prefer not to answer", isSkipped: true }
];

const seeds: Seed[] = [
  {
    constructId: "HUE-01",
    facet: "social-engagement",
    goals: ["communication", "strengths", "overall"],
    contexts: ["baseline", "baseline", "stress", "relationship", "stress", "general"],
    prompts: [
      promptByMode(
        "After several hours with people, do you look for quiet time before being social again?",
        "After several hours with people, does your child look for quiet time before spending time with others again?",
        "After several hours with people, does your partner look for quiet time before being social again?",
        "After several hours with people, does this person look for quiet time before being social again?"
      ),
      promptByMode(
        "In a new group, do you start conversations before other people talk to you?",
        "In a new group, does your child start conversations before other people talk to them?",
        "In a new group, does your partner start conversations before other people talk to them?",
        "In a new group, does this person start conversations before other people talk to them?"
      ),
      promptByMode(
        "When stressed, do you pull away from people even when their support might help?",
        "When stressed, does your child pull away from people even when support might help?",
        "When stressed, does your partner pull away from people even when support might help?",
        "When stressed, does this person pull away from people even when support might help?"
      ),
      promptByMode(
        "With people you trust, do you prefer a deep one-on-one talk instead of a group?",
        "With people your child trusts, do they prefer one close friend instead of a group?",
        "With people your partner trusts, do they prefer a deep one-on-one talk instead of a group?",
        "With people this person trusts, do they prefer a deep one-on-one talk instead of a group?"
      ),
      promptByMode(
        "When too much is happening around you, do you become quieter or less patient?",
        "When too much is happening around your child, do they become quieter or less patient?",
        "When too much is happening around your partner, do they become quieter or less patient?",
        "When too much is happening around this person, do they become quieter or less patient?"
      ),
      promptByMode(
        "Does how much time you want with other people change a lot depending on who they are?",
        "Does how much time your child wants with other people change a lot depending on who they are?",
        "Does how much time your partner wants with other people change a lot depending on who they are?",
        "Does how much time this person wants with other people change a lot depending on who they are?"
      )
    ]
  },
  {
    constructId: "HUE-02",
    facet: "signal-sensitivity",
    goals: ["emotional-reactions", "communication", "stress-patterns", "overall"],
    contexts: ["baseline", "relationship", "stress", "baseline", "stress", "general"],
    risk: "moderate",
    prompts: [
      promptByMode(
        "After a conversation, do small changes in the other person's tone stay on your mind?",
        "After a conversation, does your child keep thinking or talking about small changes in the other person's tone?",
        "After a conversation, does your partner keep thinking or talking about small changes in the other person's tone?",
        "After a conversation, does this person keep thinking or talking about small changes in the other person's tone?"
      ),
      promptByMode(
        "When someone important becomes unusually quiet, is your first thought that you did something wrong?",
        "When someone important becomes unusually quiet, does your child seem worried that they did something wrong?",
        "When someone important becomes unusually quiet, does your partner seem worried that they did something wrong?",
        "When someone important becomes unusually quiet, does this person seem worried that they did something wrong?"
      ),
      promptByMode(
        "When stressed, are noises, interruptions, or other people's emotions harder to ignore?",
        "When stressed, does your child seem more bothered by noises, interruptions, or other people's emotions?",
        "When stressed, does your partner seem more bothered by noises, interruptions, or other people's emotions?",
        "When stressed, does this person seem more bothered by noises, interruptions, or other people's emotions?"
      ),
      promptByMode(
        "Do you notice tension between people before anyone talks about it?",
        "Does your child notice tension between people before anyone talks about it?",
        "Does your partner notice tension between people before anyone talks about it?",
        "Does this person notice tension between people before anyone talks about it?"
      ),
      promptByMode(
        "After someone speaks sharply to you, does it keep bothering you even after the problem is settled?",
        "After someone speaks sharply to your child, does it seem to keep bothering them after the problem is settled?",
        "After someone speaks sharply to your partner, does it seem to keep bothering them after the problem is settled?",
        "After someone speaks sharply to this person, does it seem to keep bothering them after the problem is settled?"
      ),
      promptByMode(
        "Do the same comments or moods affect you differently with people you trust than with people you do not know well?",
        "Do the same comments or moods seem to affect your child differently with trusted people than with people they do not know well?",
        "Do the same comments or moods seem to affect your partner differently with trusted people than with people they do not know well?",
        "Do the same comments or moods seem to affect this person differently with trusted people than with people they do not know well?"
      )
    ]
  },
  {
    constructId: "HUE-03",
    facet: "regulation-recovery",
    goals: ["emotional-reactions", "stress-patterns", "conflict", "overall"],
    contexts: ["baseline", "stress", "stress", "relationship", "baseline", "general"],
    prompts: [
      promptByMode(
        "When you get upset, do you name the feeling before you act?",
        "When your child gets upset, do they name the feeling before they act?",
        "When your partner gets upset, do they name the feeling before they act?",
        "When this person gets upset, do they name the feeling before they act?"
      ),
      promptByMode(
        "When your feelings become too much, do you pause before you respond?",
        "When your child's feelings seem overwhelming, do they pause before responding?",
        "When your partner's feelings seem overwhelming, do they pause before responding?",
        "When this person's feelings seem overwhelming, do they pause before responding?"
      ),
      promptByMode(
        "After a tense talk, can you return to what you were doing without staying distracted for a long time?",
        "After a tense talk, can your child return to what they were doing without staying distracted for a long time?",
        "After a tense talk, can your partner return to what they were doing without staying distracted for a long time?",
        "After a tense talk, can this person return to what they were doing without staying distracted for a long time?"
      ),
      promptByMode(
        "When you need help, do you ask for it instead of waiting for others to notice?",
        "When your child needs help, do they ask for it instead of waiting for others to notice?",
        "When your partner needs help, do they ask for it instead of waiting for others to notice?",
        "When this person needs help, do they ask for it instead of waiting for others to notice?"
      ),
      promptByMode(
        "When you learn something important, can you change your first understanding of what happened?",
        "When your child learns something important, can they change their first understanding of what happened?",
        "When your partner learns something important, can they change their first understanding of what happened?",
        "When this person learns something important, can they change their first understanding of what happened?"
      ),
      promptByMode(
        "Do you recover from strong feelings more easily when you can be alone for a while?",
        "Does your child seem to recover from strong feelings more easily when they can be alone for a while?",
        "Does your partner seem to recover from strong feelings more easily when they can be alone for a while?",
        "Does this person seem to recover from strong feelings more easily when they can be alone for a while?"
      )
    ]
  },
  {
    constructId: "HUE-04",
    facet: "autonomy-reactance",
    goals: ["communication", "motivation", "conflict", "decision-making", "overall"],
    contexts: ["baseline", "relationship", "stress", "decision", "conflict", "general"],
    risk: "moderate",
    prompts: [
      promptByMode(
        "Do you work better when you know the goal but can choose how to reach it?",
        "Does your child do better on a task when they know the goal but can choose how to do it?",
        "Does your partner work better when they know the goal but can choose how to reach it?",
        "Does this person work better when they know the goal but can choose how to reach it?"
      ),
      promptByMode(
        "When someone gives you advice you did not ask for, do you want to push back?",
        "When someone gives your child advice they did not ask for, do they seem to want to push back?",
        "When someone gives your partner advice they did not ask for, do they seem to want to push back?",
        "When someone gives this person advice they did not ask for, do they seem to want to push back?"
      ),
      promptByMode(
        "When your choices suddenly become limited, do you push harder to protect your right to choose?",
        "When your child's choices suddenly become limited, do they push harder to protect their right to choose?",
        "When your partner's choices suddenly become limited, do they push harder to protect their right to choose?",
        "When this person's choices suddenly become limited, do they push harder to protect their right to choose?"
      ),
      promptByMode(
        "Do you make your own choice even when it may not be perfect, rather than let someone else choose for you?",
        "Does your child make their own choice even when it may not be perfect, rather than let someone else choose for them?",
        "Does your partner make their own choice even when it may not be perfect, rather than let someone else choose for them?",
        "Does this person make their own choice even when it may not be perfect, rather than let someone else choose for them?"
      ),
      promptByMode(
        "Do you stop cooperating only when you feel that someone has taken away your choice for good?",
        "Does your child stop cooperating when they seem to feel that someone has taken away their choice for good?",
        "Does your partner stop cooperating when they seem to feel that someone has taken away their choice for good?",
        "Does this person stop cooperating when they seem to feel that someone has taken away their choice for good?"
      ),
      promptByMode(
        "Is it easier for you to accept advice when it sounds like a choice, not a command?",
        "Is it easier for your child to accept advice when it sounds like a choice, not a command?",
        "Is it easier for your partner to accept advice when it sounds like a choice, not a command?",
        "Is it easier for this person to accept advice when it sounds like a choice, not a command?"
      )
    ]
  },
  {
    constructId: "HUE-05",
    facet: "belonging-reassurance",
    goals: ["communication", "emotional-reactions", "motivation", "overall"],
    contexts: ["baseline", "relationship", "stress", "relationship", "stress", "general"],
    risk: "high",
    prompts: [
      promptByMode(
        "Do regular signs of care and connection help you feel that an important relationship is okay?",
        "Do regular signs of care and connection seem to help your child feel that an important relationship is okay?",
        "Do regular signs of care and connection seem to help your partner feel that an important relationship is okay?",
        "Do regular signs of care and connection seem to help this person feel that an important relationship is okay?"
      ),
      promptByMode(
        "When you are not sure someone feels close to you, do you ask them to reassure you?",
        "When your child is unsure about closeness, do they ask the other person for reassurance?",
        "When your partner is unsure about closeness, do they ask the other person for reassurance?",
        "When this person is unsure about closeness, do they ask the other person for reassurance?"
      ),
      promptByMode(
        "When stressed, do late replies or changes in routine feel like signs that something is wrong between you?",
        "When stressed, does your child treat late replies or changed routines as signs that something is wrong in the relationship?",
        "When stressed, does your partner treat late replies or changed routines as signs that something is wrong in the relationship?",
        "When stressed, does this person treat late replies or changed routines as signs that something is wrong in the relationship?"
      ),
      promptByMode(
        "Can you rely on someone and still feel independent?",
        "Can your child rely on someone and still seem comfortable doing things on their own?",
        "Can your partner rely on someone and still feel independent?",
        "Can this person rely on someone and still seem comfortable being independent?"
      ),
      promptByMode(
        "When you worry that someone may pull away, do you try to get closer instead of pulling away first?",
        "When your child seems worried that someone may pull away, do they try to get closer instead of pulling away first?",
        "When your partner seems worried that someone may pull away, do they try to get closer instead of pulling away first?",
        "When this person seems worried that someone may pull away, do they try to get closer instead of pulling away first?"
      ),
      promptByMode(
        "Does how much reassurance you need change a lot depending on the relationship or a recent disagreement?",
        "Does how much reassurance your child seeks change a lot depending on the relationship or a recent disagreement?",
        "Does how much reassurance your partner seeks change a lot depending on the relationship or a recent disagreement?",
        "Does how much reassurance this person seeks change a lot depending on the relationship or a recent disagreement?"
      )
    ]
  },
  {
    constructId: "HUE-06",
    facet: "evaluation-response",
    goals: ["communication", "strengths", "conflict", "overall"],
    contexts: ["baseline", "relationship", "stress", "baseline", "stress", "general"],
    risk: "high",
    prompts: [
      promptByMode(
        "When someone gives you clear feedback in private, can you use it without feeling judged as a person?",
        "When someone gives your child clear feedback in private, can they use it without seeming to feel judged as a person?",
        "When someone gives your partner clear feedback in private, can they use it without seeming to feel judged as a person?",
        "When someone gives this person clear feedback in private, can they use it without seeming to feel judged as a person?"
      ),
      promptByMode(
        "When someone important corrects you, do you ask questions before explaining or defending what you meant?",
        "When someone important corrects your child, do they ask questions before explaining or defending what they meant?",
        "When someone important corrects your partner, do they ask questions before explaining or defending what they meant?",
        "When someone important corrects this person, do they ask questions before explaining or defending what they meant?"
      ),
      promptByMode(
        "When stressed, do small mistakes make you explain yourself too much or criticize yourself?",
        "When stressed, do small mistakes make your child over-explain or criticize themselves?",
        "When stressed, do small mistakes make your partner over-explain or criticize themselves?",
        "When stressed, do small mistakes make this person over-explain or criticize themselves?"
      ),
      promptByMode(
        "Can you let other people see work that is not perfect while you keep learning?",
        "Can your child let others see work that is not perfect while they keep learning?",
        "Can your partner let others see work that is not perfect while they keep learning?",
        "Can this person let others see work that is not perfect while they keep learning?"
      ),
      promptByMode(
        "When someone criticizes you in front of others, do you need time before you can respond calmly and usefully?",
        "When someone criticizes your child in front of others, do they need time before responding calmly?",
        "When someone criticizes your partner in front of others, do they need time before responding calmly and usefully?",
        "When someone criticizes this person in front of others, do they need time before responding calmly and usefully?"
      ),
      promptByMode(
        "Does feedback affect you very differently depending on who gives it or how they say it?",
        "Does feedback affect your child very differently depending on who gives it or how they say it?",
        "Does feedback affect your partner very differently depending on who gives it or how they say it?",
        "Does feedback affect this person very differently depending on who gives it or how they say it?"
      )
    ]
  },
  {
    constructId: "HUE-07",
    facet: "decision-process",
    goals: ["decision-making", "direction", "strengths", "overall"],
    contexts: ["decision", "baseline", "stress", "decision", "stress", "general"],
    prompts: [
      promptByMode(
        "Before an important choice, do you decide which new facts would actually change your mind?",
        "Before an important choice for their age, does your child decide what information could change their mind?",
        "Before an important choice, does your partner decide which new facts would actually change their mind?",
        "Before an important choice, does this person decide which new facts would actually change their mind?"
      ),
      promptByMode(
        "Can you make a good-enough choice without finding every possible detail?",
        "Can your child make a good-enough choice without finding every possible detail?",
        "Can your partner make a good-enough choice without finding every possible detail?",
        "Can this person make a good-enough choice without finding every possible detail?"
      ),
      promptByMode(
        "When you have little time, do you choose too quickly or wait too long?",
        "When your child has little time, do they choose too quickly or wait too long?",
        "When your partner has little time, do they choose too quickly or wait too long?",
        "When this person has little time, do they choose too quickly or wait too long?"
      ),
      promptByMode(
        "Can you ask someone for advice while keeping the final choice yours?",
        "Can your child ask someone for advice while keeping the final choice theirs?",
        "Can your partner ask someone for advice while keeping the final choice theirs?",
        "Can this person ask someone for advice while keeping the final choice theirs?"
      ),
      promptByMode(
        "After you choose, do you keep questioning the choice even when nothing important has changed?",
        "After your child chooses, do they keep questioning the choice even when nothing important has changed?",
        "After your partner chooses, do they keep questioning the choice even when nothing important has changed?",
        "After this person chooses, do they keep questioning the choice even when nothing important has changed?"
      ),
      promptByMode(
        "Does the time you take to choose change a lot when the choice would be hard to undo?",
        "Does the time your child takes to choose change a lot when the choice would be hard to undo?",
        "Does the time your partner takes to choose change a lot when the choice would be hard to undo?",
        "Does the time this person takes to choose change a lot when the choice would be hard to undo?"
      )
    ]
  },
  {
    constructId: "HUE-08",
    facet: "conflict-boundaries",
    goals: ["conflict", "communication", "overall"],
    contexts: ["conflict", "baseline", "stress", "relationship", "conflict", "general"],
    risk: "moderate",
    prompts: [
      promptByMode(
        "When a small disagreement starts, do you say what you think before frustration builds?",
        "When a small disagreement starts, does your child say what they think before frustration builds?",
        "When a small disagreement starts, does your partner say what they think before frustration builds?",
        "When a small disagreement starts, does this person say what they think before frustration builds?"
      ),
      promptByMode(
        "Can you set a limit without calling the other person selfish, bad, or always wrong?",
        "Can your child set a limit without calling the other person selfish, bad, or always wrong?",
        "Can your partner set a limit without calling the other person selfish, bad, or always wrong?",
        "Can this person set a limit without calling the other person selfish, bad, or always wrong?"
      ),
      promptByMode(
        "When stressed, do you go from giving in quietly to speaking much more strongly?",
        "When stressed, does your child go from giving in quietly to speaking much more strongly?",
        "When stressed, does your partner go from giving in quietly to speaking much more strongly?",
        "When stressed, does this person go from giving in quietly to speaking much more strongly?"
      ),
      promptByMode(
        "After an argument, do you clearly try to make things better instead of waiting for the tension to go away?",
        "After an argument, does your child clearly try to make things better instead of waiting for the tension to go away?",
        "After an argument, does your partner clearly try to make things better instead of waiting for the tension to go away?",
        "After an argument, does this person clearly try to make things better instead of waiting for the tension to go away?"
      ),
      promptByMode(
        "If something feels unfair, do you speak up even when you would usually avoid the issue?",
        "If something feels unfair, does your child speak up even when they would usually avoid the issue?",
        "If something feels unfair, does your partner speak up even when they would usually avoid the issue?",
        "If something feels unfair, does this person speak up even when they would usually avoid the issue?"
      ),
      promptByMode(
        "Does the way you handle conflict change based on how safe or able to speak freely you feel?",
        "Does the way your child handles conflict change based on how safe or able to speak freely they seem to feel?",
        "Does the way your partner handles conflict change based on how safe or able to speak freely they seem to feel?",
        "Does the way this person handles conflict change based on how safe or able to speak freely they seem to feel?"
      )
    ]
  },
  {
    constructId: "HUE-09",
    facet: "ambiguity-tolerance",
    goals: ["stress-patterns", "decision-making", "direction", "overall"],
    contexts: ["baseline", "stress", "decision", "baseline", "stress", "general"],
    prompts: [
      promptByMode(
        "Can you keep doing useful work while you wait for an important answer?",
        "Can your child keep doing a task while waiting for an important answer?",
        "Can your partner keep doing useful work while waiting for an important answer?",
        "Can this person keep doing useful work while waiting for an important answer?"
      ),
      promptByMode(
        "When plans are uncertain, do you keep asking for reassurance or more details?",
        "When plans are uncertain, does your child keep asking for reassurance or more details?",
        "When plans are uncertain, does your partner keep asking for reassurance or more details?",
        "When plans are uncertain, does this person keep asking for reassurance or more details?"
      ),
      promptByMode(
        "Can you make a temporary choice and change it when you learn something important?",
        "Can your child make a temporary choice and change it when they learn something important?",
        "Can your partner make a temporary choice and change it when they learn something important?",
        "Can this person make a temporary choice and change it when they learn something important?"
      ),
      promptByMode(
        "When expectations are clear, can you still adjust them when needed?",
        "When expectations are clear, can your child still adjust them when needed?",
        "When expectations are clear, can your partner still adjust them when needed?",
        "When expectations are clear, can this person still adjust them when needed?"
      ),
      promptByMode(
        "When stressed, do unclear messages quickly seem negative or threatening?",
        "When stressed, does your child quickly treat unclear messages as negative or threatening?",
        "When stressed, does your partner quickly treat unclear messages as negative or threatening?",
        "When stressed, does this person quickly treat unclear messages as negative or threatening?"
      ),
      promptByMode(
        "Is uncertainty easier when you know who is responsible for the next step?",
        "Does uncertainty seem easier for your child when they know who is responsible for the next step?",
        "Does uncertainty seem easier for your partner when they know who is responsible for the next step?",
        "Does uncertainty seem easier for this person when they know who is responsible for the next step?"
      )
    ]
  },
  {
    constructId: "HUE-10",
    facet: "reward-orientation",
    goals: ["motivation", "direction", "strengths", "overall"],
    contexts: ["baseline", "baseline", "relationship", "stress", "general", "general"],
    risk: "moderate",
    prompts: [
      promptByMode(
        "Do you keep working longer when you can see that you are getting better at something?",
        "Does your child keep working longer when they can see that they are getting better at something?",
        "Does your partner keep working longer when they can see that they are getting better at something?",
        "Does this person keep working longer when they can see that they are getting better at something?"
      ),
      promptByMode(
        "Does having a choice in how you work motivate you more than praise from other people?",
        "Does choosing how to do a task motivate your child more than praise?",
        "Does having a choice in how they work motivate your partner more than praise from other people?",
        "Does having a choice in how they work motivate this person more than praise from other people?"
      ),
      promptByMode(
        "Do you work harder when the result clearly helps someone you care about?",
        "Does your child work harder when the result clearly helps someone they care about?",
        "Does your partner work harder when the result clearly helps someone they care about?",
        "Does this person work harder when the result clearly helps someone they care about?"
      ),
      promptByMode(
        "When stressed, do you quickly lose motivation if the work feels pointless?",
        "When stressed, does your child quickly lose motivation if a task feels pointless?",
        "When stressed, does your partner quickly lose motivation if the work feels pointless?",
        "When stressed, does this person quickly lose motivation if the work feels pointless?"
      ),
      promptByMode(
        "Do clear signs of progress motivate you more than general praise?",
        "Do clear signs of progress motivate your child more than general praise?",
        "Do clear signs of progress motivate your partner more than general praise?",
        "Do clear signs of progress motivate this person more than general praise?"
      ),
      promptByMode(
        "Does what motivates you most change a lot between work, home, and close relationships?",
        "Does what motivates your child change a lot between school, home, and time with close friends or family?",
        "Does what motivates your partner most change a lot between work, home, and close relationships?",
        "Does what motivates this person most change a lot between work, home, and close relationships?"
      )
    ]
  },
  {
    constructId: "HUE-11",
    facet: "change-response",
    goals: ["direction", "stress-patterns", "strengths", "overall"],
    contexts: ["baseline", "stress", "baseline", "stress", "decision", "general"],
    prompts: [
      promptByMode(
        "When a familiar plan changes, can you adjust and still work toward the same goal?",
        "When a familiar plan changes, can your child adjust and still work toward the same goal?",
        "When a familiar plan changes, can your partner adjust and still work toward the same goal?",
        "When a familiar plan changes, can this person adjust and still work toward the same goal?"
      ),
      promptByMode(
        "When a plan changes suddenly, do you need one clear next step before you can move forward?",
        "When a plan changes suddenly, does your child need one clear next step before moving forward?",
        "When a plan changes suddenly, does your partner need one clear next step before moving forward?",
        "When a plan changes suddenly, does this person need one clear next step before moving forward?"
      ),
      promptByMode(
        "Do routines help you while still leaving room to try better ways?",
        "Do routines help your child while still leaving room to try better ways?",
        "Do routines help your partner while still leaving room to try better ways?",
        "Do routines help this person while still leaving room to try better ways?"
      ),
      promptByMode(
        "When overwhelmed, do you keep following a plan even after you know it no longer works?",
        "When overwhelmed, does your child keep following a plan even after it clearly no longer works?",
        "When overwhelmed, does your partner keep following a plan even after it clearly no longer works?",
        "When overwhelmed, does this person keep following a plan even after it clearly no longer works?"
      ),
      promptByMode(
        "Can you tell the difference between a change that feels exciting and one that will truly improve things?",
        "Can your child tell the difference between a change that feels exciting and one that will truly improve things?",
        "Can your partner tell the difference between a change that feels exciting and one that will truly improve things?",
        "Can this person tell the difference between a change that feels exciting and one that will truly improve things?"
      ),
      promptByMode(
        "Is it much easier for you to adapt when you have time to prepare?",
        "Is it much easier for your child to adapt when they have time to prepare?",
        "Is it much easier for your partner to adapt when they have time to prepare?",
        "Is it much easier for this person to adapt when they have time to prepare?"
      )
    ]
  },
  {
    constructId: "HUE-12",
    facet: "stress-coping",
    goals: ["stress-patterns", "emotional-reactions", "conflict", "overall"],
    contexts: ["stress", "baseline", "stress", "relationship", "stress", "general"],
    risk: "moderate",
    prompts: [
      promptByMode(
        "When too many demands build up, do you notice an early sign of stress before your reaction gets strong?",
        "When too many demands build up, does your child notice or name an early sign of stress before their reaction gets strong?",
        "When too many demands build up, does your partner notice or name an early sign of stress before their reaction gets strong?",
        "When too many demands build up, does this person notice or name an early sign of stress before their reaction gets strong?"
      ),
      promptByMode(
        "Do you have a dependable way to recharge before returning to a hard task?",
        "Does your child have a dependable way to recharge before returning to a hard task?",
        "Does your partner have a dependable way to recharge before returning to a hard task?",
        "Does this person have a dependable way to recharge before returning to a hard task?"
      ),
      promptByMode(
        "When overwhelmed, do you look okay on the outside while stress builds inside?",
        "When overwhelmed, does your child look okay at first and show signs of stress only later?",
        "When overwhelmed, does your partner look okay at first and show signs of stress only later?",
        "When overwhelmed, does this person look okay at first and show signs of stress only later?"
      ),
      promptByMode(
        "When stressed, can you tell others what would help instead of expecting them to guess?",
        "When stressed, can your child tell others what would help instead of expecting them to guess?",
        "When stressed, can your partner tell others what would help instead of expecting them to guess?",
        "When stressed, can this person tell others what would help instead of expecting them to guess?"
      ),
      promptByMode(
        "When your usual way of coping stops helping, do you try something different instead of only pushing harder?",
        "When your child's usual way of coping stops helping, do they try something different instead of only pushing harder?",
        "When your partner's usual way of coping stops helping, do they try something different instead of only pushing harder?",
        "When this person's usual way of coping stops helping, do they try something different instead of only pushing harder?"
      ),
      promptByMode(
        "Does your stress look very different at work than it does in close relationships?",
        "Does your child's stress look different at school than at home or with close family?",
        "Does your partner's stress look very different at work than it does in close relationships?",
        "Does this person's stress look very different at work than it does in close relationships?"
      )
    ]
  }
];

export const itemBank: QuestionItem[] = seeds.flatMap((seed) =>
  seed.prompts.map((prompts, index) => {
    const id = `ITEM-${seed.constructId.slice(4)}-${String(index + 1).padStart(2, "0")}`;
    const context = seed.contexts[index] ?? "general";
    return {
      id,
      version: "1.1.0",
      status: "pilot",
      promptByMode: prompts,
      responseType: "frequency",
      options: makeOptions(seed.constructId, seed.facet, context),
      constructId: seed.constructId,
      facetId: seed.facet,
      context,
      goalPriority: seed.goals,
      sourceType: "original",
      licensingStatus: "original",
      socialDesirabilityRisk: seed.risk ?? "low",
      readingLevelNote: "Plain-language pilot wording; cognitive interviews required.",
      chartHypothesisIds: [`COSTAR-${seed.constructId}`],
      followUp: index >= 5
    } satisfies QuestionItem;
  })
);

export const itemById = new Map(itemBank.map((item) => [item.id, item]));

export function optionsForMode(item: QuestionItem, mode: AssessmentMode): ResponseOption[] {
  return item.options.map((option) =>
    option.id === "not-observed"
      ? { ...option, label: mode === "self" ? "Not sure" : "Not sure / haven’t seen this" }
      : option
  );
}

export const assessmentLimits = {
  candidate: itemBank.length,
  minimum: 36,
  typical: 42,
  maximum: 48
} as const;

export const branchRules = [
  { id: "BR-MIN-COVERAGE", version: "1.0.0", action: "prioritize minimum three observations per construct" },
  { id: "BR-GOAL", version: "1.0.0", action: "prioritize goal-relevant fourth observations" },
  { id: "BR-UNCERTAIN", version: "1.0.0", action: "gather more evidence after uncertain responses" },
  { id: "BR-CONTRADICTION", version: "1.0.0", action: "ask context follow-up after strongly divergent answers" },
  { id: "BR-LIMIT", version: "1.0.0", action: "stop at 48 questions" }
] as const;
