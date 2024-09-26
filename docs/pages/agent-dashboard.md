# Agent Dashboard Design Document

## 1. Page Overview

The Agent Dashboard is a page for displaying and managing information related to specific tasks. It includes task details, a list of participating agents, and real-time chat history.

## 2. Technology Stack

- Frontend Framework: Nuxt 3
- UI Component Library: Shadcn/vue
- Styling: Tailwind CSS, Tailwind-Animate
- Icons: Phosphor Icons (PH Icons)
- Backend Integration: nuxt-js/supabase
- Data Storage: Upstash Redis

## 3. Page Structure

### 3.1 Header

- Page Title: Agent Dashboard
- Use large font, center-aligned

### 3.2 Task Information Card (TaskInfoCard)

- Position: Top of the page, full width
- Design: White background, rounded corners, slight shadow
- Content:
  - Task ID
  - Description
  - Complexity
  - Status
  - Cost Limit
  - Current Cost
- Layout: Use grid layout, divide information into two columns
- Icons: Use PH Icons to enhance visual effect

### 3.3 Agent Card List (AgentCardList)

- Position: Below the task information card
- Design: Horizontally scrolling card list
- Each card contains:
  - Agent Name
  - Agent ID
  - Agent Cost
- Card Style: White background, rounded corners, slight shadow
- Scroll Indication: Faded edge on the right side, suggesting more content

### 3.4 Chat History (ChatHistory)

- Position: Below the Agent card list
- Title: Chat History
- Real-time update control:
  - Label: Real-time updates
  - Control: Toggle Switch
- Message List:
  - User messages: Right-aligned, theme color background
  - Agent messages: Left-aligned, light gray background
  - Each message displays: Role, content, timestamp
- Message Bubbles: Rounded corner design
- Scroll Area: Fixed height, scrollable

## 4. Responsive Design

- Mobile-first design
- Stack sections vertically on small screen devices
- Use Tailwind CSS responsive classes

## 5. Color Scheme

- Use Tailwind CSS color variables for automatic adaptation
- Theme color: primary
- Background color: background
- Text color: foreground
- Secondary text color: muted-foreground

## 6. Interaction

- Agent card list supports left and right swiping
- Real-time update toggle for chat history
- Chat history supports scroll loading for more messages

## 7. Data Flow

- Use Upstash Redis REST API to fetch task information, Agent list, and chat records
- Real-time updates use WebSocket or polling mechanism

## 8. Performance Considerations

- Lazy load Agent cards and chat messages
- Use virtual scrolling to optimize long list performance

## 9. Accessibility

- Use semantic HTML structure
- Ensure appropriate color contrast
- Provide keyboard navigation support for interactive elements

## 10. Internationalization

- Support for multiple language switching (reserved)
- Use vue-i18n for text management

## 11. Error Handling

- Provide graceful error prompts for API request failures
- Implement retry mechanism

## 12. Testing Strategy

- Unit Testing: Use Vue Test Utils
- End-to-end Testing: Use Cypress

## 13. Deployment

- Use Nuxt 3's SSR functionality
- Consider using CDN to optimize static resource loading
