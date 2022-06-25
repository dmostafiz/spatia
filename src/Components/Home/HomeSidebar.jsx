import { Sidebar } from 'flowbite-react'
import React, { useState } from 'react'
import { AiOutlineDashboard } from 'react-icons/ai'
import { HiShoppingBag } from 'react-icons/hi'
import Link from 'next/link';

export default function HomeSidebar() {


  return (
    <>

      <div className="w-fit bg-gray-50">
        <Sidebar aria-label="Sidebar with multi-level dropdown example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Link href='/'>
                <Sidebar.Item
                  href="/"
                  icon={AiOutlineDashboard}
                >
                  Dashboard
                </Sidebar.Item>
              </Link>

              <Sidebar.Collapse
                icon={HiShoppingBag}
                label="E-commerce"
              >
                <Link href="/test">
                  <Sidebar.Item href="/test">
                    Products
                  </Sidebar.Item>
                </Link>
              </Sidebar.Collapse>

              <Sidebar.Item
                href="#"
              // icon={HiInbox}
              >
                Inbox
              </Sidebar.Item>

              <Sidebar.Item
                href="#"
              // icon={HiUser}
              >
                Users
              </Sidebar.Item>

              <Sidebar.Item
                href="#"
              // icon={HiShoppingBag}
              >
                Products
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
              // icon={HiArrowSmRight}
              >
                Sign In
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
              // icon={HiTable}
              >
                Sign Up
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>

    </>
  )
}