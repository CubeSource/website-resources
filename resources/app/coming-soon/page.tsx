'use client';

import Link from "next/link";
import { vt323 } from "../../lib/fonts";
import Content from "../../components/content/Content";
import Header from "../../components/content/Header";
import Text from "../../components/content/Text";
import Section from "../../components/content/Section";

export default function ComingSoonPage() {
    return (
        <Content>
            <div className="space-y-3">
                <h1 className={`${vt323.className} text-4xl text-zinc-200`}>
                    Coming Soon
                </h1>
                <Header>
                    This content is currently under development.
                </Header>
            </div>

            <section className="space-y-4">
                <Section>Stay Tuned</Section>
                <Text>
                    We are working hard to bring you this content. In the meantime, if you have specific questions or would like to request this topic be prioritized, please let us know!
                </Text>
                <div className="pt-4">
                    <a
                        href="https://www.cubesource.space/contact-8"
                        target="_blank"
                        className={`${vt323.className} inline-block px-6 py-2 border border-white/20 hover:bg-white/10 transition-colors text-xl text-zinc-200`}
                    >
                        Contact Us
                    </a>
                </div>
            </section>


        </Content>
    );
}
