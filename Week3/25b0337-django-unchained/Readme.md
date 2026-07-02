## Frontier Picked

I picked the **Bounty Board** frontier for this assignment.
In this project, the main idea is to create and manage bounties. Each bounty has a target name, reward amount, status, owner, and creation time. Users can create new bounties, view their own bounties, update them, and delete them through API endpoints.

## Bonus Attempted

I attempted the **Caching** bonus.

The bounty list endpoint is cached so repeated requests do not query the database every time. Whenever a bounty is created, updated, or deleted, the cache is cleared so that the next request returns the latest data.
