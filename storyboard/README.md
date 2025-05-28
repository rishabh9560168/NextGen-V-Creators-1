 



## Storyboard


Experiment 1: Logic Gates Implementation (SOP/POS form)

### 1. Story Outline
This experiment introduces learners to the foundational concept of implementing Boolean expressions using logic gates in SOP (Sum of Products) and POS (Product of Sums) forms. The goal is to bridge the theoretical knowledge of Boolean algebra and digital logic design with practical circuit realization using universal gates like NAND and NOR.

The user will be guided through a virtual lab where they can enter a Boolean expression in SOP/POS form, simplify it using Boolean laws or K-maps, and then simulate the logical circuit. This interactive environment will help learners identify, assemble, and verify correct logic gate combinations based on a given expression. Mistakes, incorrect output observations, and conceptual pitfalls are handled through guided hints and feedback.



### 2. Story

This experiment simulates the real-world task of building logical circuits based on Boolean expressions. The user begins by choosing whether they want to work in SOP or POS form. They are then provided with a truth table or Boolean expression, which they must reduce and translate into logic gate combinations.

The system allows drag-and-drop of gates such as AND, OR, NOT, NAND, NOR to build circuits. The user can test different inputs and observe outputs using a virtual LED or waveform display. Challenges include identifying correct simplifications and connecting gates in the correct sequence.

Errors like incorrect connections or logic mismatches are detected, and learners are offered feedback. In the end, a summary and evaluation based on their performance (time, number of attempts, and hints used) is provided.

#### 2.1 Set the Visual Stage Description:
Upon entering the simulator, the user sees:

1.A Boolean expression/truth table panel (input area).

2.A digital breadboard/workspace.

3.A toolbox containing logic gates (AND, OR, NOT, NAND, NOR, XOR, XNOR).

4.Input switches (A, B, C...) and output LEDs.

5.A simulation button to test circuit behavior.

6.Hint/help icon.

7.K-map simplifier (optional module).



#### 2.2 Set User Objectives & Goals:
1.Understand how to convert Boolean expressions to SOP/POS forms.

2.Implement the expressions using logic gates.

3.Verify the output of the circuit for all input combinations.

4.Minimize the logic expression using K-map (if included).

5.Learn the difference between SOP and POS circuits practically.

The user starts by choosing SOP or POS mode, inputs the Boolean expression or truth table, simplifies it, builds the circuit using provided gates, and tests the outputs.


#### 2.3 Set the Pathway Activities:

1.Select SOP or POS mode.

2.Receive the Boolean expression or truth table.

3.Optionally simplify the expression using Boolean laws or K-map.

4.Drag and place the required gates in the circuit area.

5.Connect inputs and gates logically as per the expression.

6.Test for all input combinations.

7.Observe outputs through LEDs or waveform.

8.Submit and receive evaluation feedback.



##### 2.4 Set Challenges and Questions/Complexity/Variations in Questions:

1.Implement the same logic using both NAND-only and NOR-only logic.

2.Choose the correct K-map simplification for a given expression.

3.Predict the output without simulating and match it after circuit simulation.

4.Convert complex expressions involving 3-4 variables.

5.Distinguish between SOP and POS when both give the same output.


##### 2.5 Allow pitfalls:
1.User may incorrectly connect gates (e.g., feed output to incorrect input).

2.May place wrong gate (e.g., AND instead of NAND).

3.May skip simplification and implement unnecessarily complex circuits.

4.May assume output without verifying all input cases.

These pitfalls are caught by automatic verification or output mismatch alerts.



##### 2.6 Conclusion:
At the end of the simulation:

1.The system shows a report: Time taken, attempts made, and hints used.

2.Feedback on whether the output for all inputs matches the expected output.

3.Suggestions on circuit optimization (if redundant gates were used).

4.The learner walks away with a concrete understanding of logic gate-based implementation of Boolean expressions in SOP/POS formats.



##### 2.7 Equations/formulas: NA
Equations such as:

SOP form: 
𝑌=AB'+AB

POS form: 
𝑌=(A+B)(A'+B')




### 3. Flowchart
Link to flow chart Here : Store in the  /flowchart folder within pedagogy folder in your repo
<br>
(Guide :The lab proposer should extract logic from the story, prepare a flowchart from the story narration and write the algorithm to execute the black box.  use Google Drawings https://docs.google.com/drawings/ (send the link to your flowchart and also attach .png by exporting it )

### 4. Mindmap
 Link to mindmap here : Store the mindmap in both .mm & .png extension in the  /mindmap folder and include link of only .pdf verison here
 <br>
 (Guide : An elaborate mind map (connecting all the points in the experiment flow ) should be prepared and submitted by the lab proposer. The mind map should be a clear and detailed document that takes into account all minute intri5acies involved in the development of virtual lab. The mindmap should be self-content and any developer across the globe should be able to code it with all those details. using only FreeMind http://freemind.sourceforge.net/wiki/index.php/Main_Page (send the .png file and also the original .mm extension project file. )

### 5. Storyboard

Link the storyboard (.gif file ) in here :
(Guide: This document should include sketching and description scene wise (duration, action, description). Software to be used for storyboarding : https://wonderunit.com/storyboarder/ (Its a FOSS tool).
