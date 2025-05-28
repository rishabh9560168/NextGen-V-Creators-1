# Steps to Create Logic Gates Implementation Experiment (SOP/POS form)

Welcome to the experiment development guide for the Logic Gates Implementation in Sum of Products (SOP) and Product of Sums (POS) forms. This guide will help developers create and maintain the experiment as part of the Virtual Labs project.

---

## Verify and Understand the Experiment Repositories

Begin by reviewing and understanding the structure and purpose of the experiment repositories. For more details visit [here](https://vlead.vlabs.ac.in/development/#development-process).

---

## Repository Creation

The VLEAD team will create a GitHub repository for this experiment. Write access is required to create, edit, or modify the experiment. You can refer to this [example repository](https://github.com/virtual-labs-cms/exp-template) for structure and format.

---

## Branch Structure

Each experiment repository contains these branches:

- **dev** (development)
- **testing** (end-to-end testing)
- **gh-pages** (GitHub Pages hosting)
- **main** (production-ready)

Work only in the **dev** branch. After testing, merge dev into **testing** to deploy to GitHub Pages for review.

---

## Content for Experiment Development

Please maintain the following file structure and file names:

1. ### aim.md  
   Describe the experiment’s goals and what learners should achieve by the end.

2. ### logic-gates-implementation.md  
   This is the main experiment content page. The title should clearly state the experiment's name:  
   **Logic Gates Implementation (SOP/POS form)**.

3. ### pretest.json and posttest.json  
   Use JSON files for quizzes:  
   - **Pretest:** Assess prior knowledge before starting.  
   - **Posttest:** Assess understanding after completing.  
   Follow the format explained [here](https://github.com/virtual-labs/ph3-lab-mgmt/blob/dev/docs/quiz.md).  
   Validate your JSON via https://jsonlint.com/.

4. ### theory.md  
   Provide theoretical background on logic gates, Boolean algebra, SOP and POS forms. Use images, tables, or LaTeX where needed.

5. ### procedure.md  
   Step-by-step guide to simulate the logic gates in SOP and POS forms, including screenshots or diagrams if needed.  
   Reference example: [procedure](https://virtual-labs.github.io/exp-adder-circuit-iiith/procedure.html).

6. ### simulation folder  
   Contains files supporting the interactive simulation:

   - **css/** — stylesheets  
   - **js/** — JavaScript files  
   - **images/** — diagrams or icons  

   The main HTML file must be named **index.html**.

7. ### reference.md  
   List all references and resources used in development.

---

## Do’s and Don’ts

### Do’s:
- Develop only in the **dev** branch and merge tested changes into **testing**.  
- Use best practices detailed [here](https://vlead.vlabs.ac.in/development/#best-practices).  
- Name the simulation’s main page **index.html** to enable proper functioning.

### Don’ts:
- Avoid committing unnecessary files.  
- Do not delete the **gh-pages** branch; it handles automatic deployment to GitHub Pages.

---

## Additional Resources

- [Virtual Labs Onboarding Process](https://vlead.vlabs.ac.in/development/#onboarding-process)  
- [Virtual Labs Development Process](https://vlead.vlabs.ac.in/development/#development-process)  
- [Virtual Labs Hosting Process](https://vlead.vlabs.ac.in/development/#hosting-process)

---

This completes the setup guide for the **Logic Gates Implementation (SOP/POS form)** experiment. Follow these instructions carefully to develop a consistent and quality Virtual Lab experiment.
