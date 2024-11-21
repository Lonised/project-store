import React from 'react'

export default function Account() {
  return (
    <div>
        <header></header>
        <main>
            <section className={styles['wrapper-account']}>
                <div className={styles['account']}>
                    <div className={styles['accountHeader']}>
                        <a href="#"><img src="#" alt="#" /><img src="#" alt="#" /></a>
                        <div className={styles['accountUpName']}>
                            <img src="#" alt="#" />
                            <p>name</p>
                            <a href="#"><img src="#" alt="#" /></a>
                        </div>
                    </div>
                    <div className={styles['accountSection']}>
                        <a href="#">My Addresses</a>
                        <a href="#">My Wallet</a>
                        <a href="#">My Orders</a>
                        <a href="#">My Account</a>
                    </div>
                </div>

                <section className={styles['section-myAddresses']}>
                    <div className={styles['myAddresses']}>
                        <h2>My Addresses</h2>
                        <p>Add and edit addresses that you use frequently.</p>
                        <div className={styles['accountLine']}></div>
                        <div className={styles['addresses']}>
                            <p>You haven't saved any addresses yet.</p>
                            <button className={styles['buttonPassive']}>Add addresses</button>
                        </div>
                    </div>

                </section>

                <section className={styles['section-myWallet']}>
                    <div className={styles['myWallet']}>
                    <h2>My Wallet</h2>
                        <p>To pay for orders quickly, save your card details.</p>
                        <div className={styles['accountLine']}></div>
                        <div className={styles['addresses']}>
                            <p>No saved cards</p>
                            <b>When placing an order, save your payment information. It is safe and secure.</b>
                        </div>
                    </div>
                </section>

                <section className={styles['section-myOrders']}>
                    <div className={styles['myOrders']}>
                        <h2>My Orders</h2>
                        <p>View your order history and check the status of recent orders.</p>
                        <div className={styles['accountLine']}></div>
                        <div className={styles['orders']}>
                            <p>You haven't ordered anything yet.</p>
                            <a href='#'>View</a>
                        </div>
                    </div>
                </section>

                <section className={styles['section-myAccount']}>
                    <div className={styles['myAccount']}>
                        <div classNamw={styles['accountButtonsUp']}>
                            <h2>Account</h2>
                            <button className={styles['buttonAccountPassive']}>Reset</button>
                            <button className={styles['buttonAccountActive']}>Update</button>
                        </div>
                    <p> View and edit your details.</p>
                    <div className={styles['accountLine']}></div>
                    <h3>Display information</h3>
                    <p>This information will be visible to all users of the site.</p>
                    <div className={styles['accountInputs']}>
                        <div className={styles['accountInputsDetails']}>
                            <p>Display Name *</p>
                            <input type="text" />
                        </div>
                        <div className={styles['accountInputsDetails']}>
                            <p>Title</p>
                            <input type="text" />
                        </div>
                    </div>
                    <div className={styles['accountLine']}></div>
                    <h3>Personal Details</h3>
                    <p>Update your personal information</p>
                        <div className={styles['accountInputs']}>
                            <div className={styles['accountInputsDetails']}>
                                <p>First Name</p>
                                <input type="text" />
                            </div>
                            <div className={styles['accountInputsDetails']}>
                                <p>Last Name</p>
                                <input type="text" />
                            </div>
                            <div className={styles['accountInputsDetails']}>
                                <p>Number</p>
                                <input type="text" />
                            </div>
                        </div>
                        <div classNamw={styles['accountButtonsDown']}>
                            <button className={styles['buttonAccountPassive']}>Reset</button>
                            <button className={styles['buttonAccountActive']}>Update</button>
                        </div>
                    </div>
                </section>
            </section>

        </main>
        <footer></footer>
    </div>
  )
}
