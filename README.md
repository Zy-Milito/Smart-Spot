# Smart Spot Manager

This project is a website that I am building for university, which will work as a management software for a large parking garage.

Both the frontend and the backend are being developed simultaneously, with the frontend being generated with Angular CLI 18, and the backend on .net.

All vectors used were taken from https://www.freepik.com.

## Bugs

(solved) Issue #1: Availability tab will not update data from occupied parking spots. parkingSpot.availability cannot be evaluated as the property seems to be null. Leads to issue #2.

(solved) Issue #2: Disabling a parking spot will disable it on the backend but the changes won't be reflected on the front end as table data and buttons won't be updated. Leads to issue #3.

(solved) Issue #3: User is only able to disable spots on loop.

(solved) Issue #4: Admin guard returns false despite being logged in with an admin account.

(solved) Issue #5: Logging in with standard accounts returns 401 Unauthorized.

(solved) Issue #6: Logging out won't redirect to login.

(solved) Issue #7: Updating a parking rate value returns error 500 (authorization error).

(solved) Issue #8: Parking spots with at least one completed sale are not properly displayed and user is unable to close new orders, leaving the parking spot on "available" all the time (frontend-wise).
