import { Section, Rules, Avoid, When } from '../../site/kit';

// Use the framework's authentication, never our own: what Laravel and Django already give, and what we add.

export default function Framework() {
  return (
    <>
      <Section title="Built in, or one package away">
        <When head={['', 'Laravel', 'Django']} rows={[
          ['Sign in and sessions', 'Auth guards, sessions, remember me', 'django.contrib.auth, sessions'],
          ['Passwords', 'Hashing, reset links', 'Hashing, validators, reset views'],
          ['Email verification', 'Built in', 'Add django-allauth'],
          ['Sign-in throttling', 'Rate limiter', 'Add django-axes'],
          ['Roles and rules', 'Gates and policies', 'Groups and permissions'],
          ['API tokens', 'Sanctum', 'Django REST framework'],
        ]} />
      </Section>

      <Section title="What we add, when a client needs it">
        <When head={['', 'Laravel', 'Django']} rows={[
          ['Invites', 'Signed routes and an Invite model', 'django-invitations, or signing'],
          ['Two-step sign-in', 'Fortify', 'django-allauth MFA'],
          ['Sign in with Google or Microsoft', 'Socialite', 'django-allauth'],
          ['Sign-in history and alerts', 'Our access log', 'Our access log'],
        ]} />
      </Section>

      <div className="g-duo">
        <Section title="Guidelines">
          <Rules items={[
            ['Never our own.', 'Password hashing, sessions, reset tokens, and CSRF come from the framework, always.'],
            ['Style its pages, keep its logic.', 'Every page in this chapter is the framework’s view with our template.'],
            ['Reach for the package first.', 'Two-step and Google or Microsoft sign-in come from Fortify, Socialite, or django-allauth.'],
            ['Throttle sign-ins from the start.', 'Laravel’s rate limiter, or django-axes. See Authentication › Sign in.'],
            ['Every sign-in is logged.', 'Who, when, from where, and whether it worked. Admins can see it; people see their own in User preferences.'],
          ]} />
        </Section>
        <Section title="Avoid">
          <Avoid items={[
            ['Home-made hashing, sessions, or reset tokens.', 'Each one reopens a security hole the framework already closed.'],
            ['Copying the framework’s views to restyle them.', 'Change the template only. Copied logic stops getting the framework’s fixes.'],
            ['Building two-step or social sign-in from scratch.', 'The packages are tested and kept up to date; ours wouldn’t be.'],
            ['Leaving sign-in unthrottled.', 'Anyone can guess passwords as fast as they like.'],
            ['Sign-ins nobody can see.', 'When an account is misused, there’s no record of who got in, when, or from where.'],
          ]} />
        </Section>
      </div>
    </>
  );
}
