<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button, Input } from 'flowbite-svelte';
    import AuthButton from './AuthButton/AuthButton.svelte';
  </script>
  
  <Navbar>
    <NavBrand href="/">
      <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">AuthSystem</span>
    </NavBrand>
    <div class="flex md:order-2">
        <AuthButton/>
    </div>
    <NavUl class="order-1">
      <NavLi href="/">Home</NavLi>
      <NavLi href="/petjournal">Pet Journal</NavLi>
    </NavUl>
  </Navbar>